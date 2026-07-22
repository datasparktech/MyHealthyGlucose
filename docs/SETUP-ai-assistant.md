# Setup: AI Diabetes Assistant

The AI assistant (`/assistant`) is built and live in the UI, but it needs a
server-side function to talk to Claude safely (so the API key is never exposed in
the browser). Until this is set up, the assistant shows a friendly "not available"
message and points people to the Info Hub.

## Why a server function?

The site is static, so it can't hold a secret API key. The assistant calls a
**Supabase Edge Function** (`diabetes-assistant`), which holds the Anthropic API key
as a server-side secret and forwards requests to Claude. The browser never sees the
key.

## One-time setup (~15 min)

### 1. Get an Anthropic API key
- Sign up at https://console.anthropic.com
- Create an API key. **Note:** this key has usage-based billing — set a spending
  limit in the Anthropic console so a burst of traffic can't run up a surprise bill.

### 2. Install the Supabase CLI
Follow https://supabase.com/docs/guides/cli — on most systems:
```
npm install -g supabase
```

### 3. Log in and link your project
```
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```
(Your project ref is the part before `.supabase.co` in your Supabase URL.)

### 4. Set the API key as a secret
```
supabase secrets set ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 5. Deploy the function
The function code is already in the repo at
`supabase/functions/diabetes-assistant/index.ts`. From the repo root:
```
supabase functions deploy diabetes-assistant
```

That's it. The assistant page will start working immediately.

## Safety notes (please read)

- The function has a **strict system prompt**: general education only, no diagnosis,
  no dosing advice, redirects personal-treatment questions to a doctor.
- The front-end also blocks obvious dosing questions before they're even sent.
- There's a persistent medical disclaimer on the page.
- **Strongly recommended:** have a lawyer review the disclaimer wording before you
  promote the assistant publicly. AI answering health questions carries liability,
  and the disclaimer is your main protection.
- Set an **Anthropic spending cap** so traffic can't cause runaway costs.

## Cost control

- Each answer is capped at 600 tokens and only the last ~10 messages are sent.
- For a small site this is typically a few dollars a month, but a spending cap in
  the Anthropic console is the real safeguard.
