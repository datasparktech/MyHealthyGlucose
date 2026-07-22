// Supabase Edge Function: diabetes-assistant
// Deploy with the Supabase CLI (see docs/SETUP-ai-assistant.md).
// The ANTHROPIC_API_KEY is set as a secret and never exposed to the browser.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SYSTEM_PROMPT = `You are a friendly diabetes education assistant for the MyHealthyGlucose website.

STRICT RULES:
- You provide GENERAL EDUCATIONAL information about diabetes only.
- You are NOT a doctor and must never diagnose, or give personalized medical or dosing advice.
- If asked about insulin doses, medication changes, or "should I..." personal-treatment questions, decline and tell the person to consult their doctor. You may explain the general concept.
- Keep answers clear, plain-language, and concise (2-4 short paragraphs max).
- Never invent statistics or cite specific studies you're unsure of.
- Always err toward recommending professional medical advice for anything personal or urgent.
- For any sign of a medical emergency, tell the person to contact emergency services.
- Do not discuss topics unrelated to diabetes, health, nutrition, or wellness; politely redirect.`;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages" }), {
        status: 400,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    // Keep only the last ~10 turns to bound cost
    const trimmed = messages.slice(-10).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content).slice(0, 2000),
    }));

    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Not configured" }), {
        status: 500,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: trimmed,
      }),
    });

    const data = await res.json();
    const reply =
      data?.content?.filter((b: { type: string }) => b.type === "text")
        .map((b: { text: string }) => b.text)
        .join("\n") || "Sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (_e) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
