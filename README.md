# SkillSwap Studio

A fresh, responsive skill exchange app with a working Node backend for optional AI coaching. There are no packages to install.

## Run on Windows

1. Install Node.js 22 or later if it is not already installed.
2. Extract the ZIP and open its `skillswap` folder.
3. In that folder, open PowerShell and run:

   ```powershell
   npm start
   ```

4. Open **http://localhost:3000** in Chrome or Edge.

You can also double-click `START-WINDOWS.cmd`. Keep the terminal running while using the app.

## Enable real AI coaching

The app works immediately with a clearly labeled local planner. For generative AI:

1. Copy `.env.example` to `.env` in the project root.
2. Set `OPENAI_API_KEY` to your own OpenAI API key. API usage requires a separately funded API account; a ChatGPT subscription does not supply API credits.
3. Optionally change `OPENAI_MODEL` to a model available to your API account.
4. Restart `npm start`. The coach should display **AI connected**.

The key stays on the server and is never included in browser JavaScript. Coaching sends only the submitted learning goal, selected skills, level, and time budget to OpenAI. Requests use the Responses API with `store: false`. AI output is guidance and can be wrong. The server binds to loopback and restricts browser API requests to its local origin. Do not expose this development server publicly without authentication, deployment hardening, and appropriate rate limiting.

## What works

- Responsive dashboard and profile editor.
- Six clearly labeled sample community profiles, searchable and filterable by skill.
- Transparent matching: 45 points for a learning overlap, 35 for a reciprocal teaching overlap, and 20 for a shared day. These are rule-based scores, not AI probabilities.
- Saved partners and locally stored bookings, with future-date validation, overlap prevention, and credit checks.
- A time wallet with 120 demo starter minutes. Learning bookings reserve minutes; cancellation refunds them. Completed teaching adds minutes. Completion cannot be recorded before the scheduled start, and all completion is self-reported.
- Jitsi video rooms with random room names, copyable invite links, camera/microphone controls and screen sharing through Jitsi, and local session notes that can be exported.
- An AI learning coach with a real server-side provider integration, a local fallback planner, session preparation, and curated practice quizzes.
- Three project challenges with saved milestones.
- A personal skill passport with project links, reflections, deletion confirmation, and Markdown export.
- JSON workspace backup and validated restore with confirmation before replacement.

## Video calls

Go to **My sessions → Start a video room**, or open a scheduled exchange. Choose **Start video call** to load Jitsi. Share the invite link with a real partner. The invite opens the same room on Jitsi and works independently of the sample profiles in SkillSwap. Internet access is required; camera and microphone permissions are requested by the browser. The first participant may need to sign in to Jitsi to host. If an embedded call is blocked, use **Open Jitsi in a new tab**. Features depend on the Jitsi service and browser permissions. No live video call was verified in the build environment.

Notes are private to the current browser; they are not synchronized with the other participant. SkillSwap does not implement recording or transcription.

## Data and prototype boundaries

This is a functioning **personal prototype**, not a live community marketplace. Community members are sample data. Booking a sample profile does not notify anyone or establish a real appointment. There are no member accounts, real reviews, payments, or verified certificates. Credits have no monetary value.

The app saves your workspace in localStorage for the current browser and origin. Clearing browser data deletes it. Moving from localhost to another domain or port creates a separate workspace. Export a backup to move it. There is no shared member database or cross-device account sync. A real multi-user release would need authenticated accounts, server-stored profiles, booking acceptance, participant-confirmed credits, moderation, and notifications.

## Checks

```powershell
npm run check
npm test
```

Tests cover reciprocal matching, credit accounting, booking conflicts, date validation, public-file restrictions, cross-origin rejection, and missing AI configuration. AI responses and actual multi-participant video calls require configured external services and were not tested live.

## Project structure

```text
public/index.html   Accessible application shell
public/styles.css   Responsive visual system
public/app.js       Pages, dialogs, local persistence, Jitsi integration
public/core.js      Matching, booking and credit rules
server.mjs          Static file server and optional AI endpoint
test/               Behavior and server checks
.env.example        Server configuration template
```

`public/` can be served by a static host. The dashboard, local planner, projects, and video room links still work, but generative AI needs `server.mjs` or a compatible `/api/coach` backend. Never place an API key in `public/`.

## Integration references

- Jitsi IFrame API: https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe/
- OpenAI Responses API: https://developers.openai.com/api/reference/resources/responses/methods/create

Sample profiles are fictional. Google Fonts are optional; system fonts work if fonts cannot load.
