import Papa from "papaparse";

export interface GlucoseReading {
  time: Date;
  value: number; // mg/dL
}

export interface CGMStats {
  count: number;
  avg: number;
  gmi: number; // glucose management indicator (estimated A1C)
  timeInRange: number; // % 70-180
  timeBelow: number; // % <70
  timeAbove: number; // % >180
  min: number;
  max: number;
  days: number;
  startDate: Date;
  endDate: Date;
}

// Common column-name variants across Dexcom / Libre / Contour exports
const TIME_KEYS = [
  "timestamp", "time", "device timestamp", "timestamp (yyyy-mm-ddthh:mm:ss)",
  "date", "datetime", "reading date/time", "meter timestamp",
];
const VALUE_KEYS = [
  "glucose value (mg/dl)", "glucose", "glucose (mg/dl)", "sensor glucose (mg/dl)",
  "historic glucose mg/dl", "scan glucose mg/dl", "glucose reading (mg/dl)",
  "value", "mg/dl", "glucose value", "sensor glucose",
];
const VALUE_KEYS_MMOL = [
  "glucose value (mmol/l)", "glucose (mmol/l)", "historic glucose mmol/l",
  "scan glucose mmol/l", "sensor glucose (mmol/l)", "mmol/l",
];

function findKey(headers: string[], candidates: string[]): string | null {
  const lower = headers.map((h) => h.toLowerCase().trim());
  for (const c of candidates) {
    const idx = lower.indexOf(c);
    if (idx !== -1) return headers[idx];
  }
  // partial match fallback
  for (let i = 0; i < lower.length; i++) {
    if (candidates.some((c) => lower[i].includes(c) || c.includes(lower[i]))) {
      return headers[i];
    }
  }
  return null;
}

export interface ParseResult {
  readings: GlucoseReading[];
  error: string | null;
}

export function parseCGMCsv(text: string): ParseResult {
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });

  let rows = parsed.data;
  if (!rows.length) {
    // Some exports have a few preamble lines before the header — retry skipping them
    const lines = text.split(/\r?\n/);
    for (let skip = 1; skip <= 3; skip++) {
      const retry = Papa.parse<Record<string, string>>(lines.slice(skip).join("\n"), {
        header: true,
        skipEmptyLines: true,
      });
      if (retry.data.length && retry.meta.fields && retry.meta.fields.length > 1) {
        rows = retry.data;
        parsed.meta = retry.meta;
        break;
      }
    }
  }

  const headers = parsed.meta.fields ?? [];
  if (!headers.length) return { readings: [], error: "Couldn't read any columns from this file." };

  const timeKey = findKey(headers, TIME_KEYS);
  let valueKey = findKey(headers, VALUE_KEYS);
  let isMmol = false;
  if (!valueKey) {
    valueKey = findKey(headers, VALUE_KEYS_MMOL);
    isMmol = true;
  }

  if (!timeKey || !valueKey) {
    return {
      readings: [],
      error:
        "This file doesn't look like a recognized glucose export. We look for a timestamp column and a glucose column (mg/dL or mmol/L).",
    };
  }

  const readings: GlucoseReading[] = [];
  for (const row of rows) {
    const rawTime = row[timeKey];
    const rawVal = row[valueKey];
    if (!rawTime || !rawVal) continue;
    const time = new Date(rawTime);
    let value = parseFloat(rawVal);
    if (isNaN(time.getTime()) || isNaN(value)) continue;
    if (isMmol) value = value * 18.0182; // convert to mg/dL
    if (value < 20 || value > 600) continue; // sanity bounds
    readings.push({ time, value });
  }

  if (!readings.length) {
    return { readings: [], error: "We found the columns but couldn't read any valid readings." };
  }

  readings.sort((a, b) => a.time.getTime() - b.time.getTime());
  return { readings, error: null };
}

export function computeStats(readings: GlucoseReading[]): CGMStats {
  const n = readings.length;
  const sum = readings.reduce((s, r) => s + r.value, 0);
  const avg = sum / n;
  const inRange = readings.filter((r) => r.value >= 70 && r.value <= 180).length;
  const below = readings.filter((r) => r.value < 70).length;
  const above = readings.filter((r) => r.value > 180).length;
  const values = readings.map((r) => r.value);
  const startDate = readings[0].time;
  const endDate = readings[n - 1].time;
  const days = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / 86400000));

  return {
    count: n,
    avg: Math.round(avg),
    gmi: Math.round((3.31 + 0.02392 * avg) * 10) / 10, // GMI formula → estimated A1C %
    timeInRange: Math.round((inRange / n) * 100),
    timeBelow: Math.round((below / n) * 100),
    timeAbove: Math.round((above / n) * 100),
    min: Math.round(Math.min(...values)),
    max: Math.round(Math.max(...values)),
    days,
    startDate,
    endDate,
  };
}
