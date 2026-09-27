# CyberDaily MVP

CyberDaily serves three daily cybersecurity exercises: phishing detection, log analysis and secure code review. Scores, answer explanations and streaks are saved in D1, with server-side grading and one attempt per user/date/challenge.

## Daily automation on your PC

The active task `Prepare CyberDaily challenges` returns to this chat daily at 08:00 UK time. Codex authors and reviews the next day's pack directly, saves content/daily-packs.json and builds the site. There are no AI API calls or required API keys in the website. Keep the computer on, connected to the internet, and the desktop app running for local tasks.

Challenge dates and resets use UTC. Packs are prepared a day ahead. Existing saved daily packs remain immutable so scores cannot change underneath learners. If no prepared pack exists, the site explicitly shows starter practice content. A missed run can therefore mean starter content that day. After checks pass, the task commits daily content updates and pushes them to the private GitHub repository at https://github.com/Puddleweb/cyberdaily. Website deployment and sharing changes are not authorised.

See DAILY-CONTENT.md for the complete recurring workflow.

## Run locally

Use Node 22.13 or newer. Install with `npm run install:ci`. Build using `node scripts/run-framework.mjs build`. Apply the database migration once if this is a fresh checkout:

`node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_lucky_black_panther.sql`

Start with `npm run dev` and visit the printed URL. The local sign-in link supplies the starter's simulated account for testing. Hosted identity remains platform-owned.

## Checks

- `node scripts/validate-content.mjs`: validates dated local challenge packs against the application schema.
- `node node_modules/typescript/bin/tsc --noEmit`: checks code types.
- `node scripts/smoke-test.mjs`: local-only API checks against a starter-content day. Uses the local test identity and writes test attempts. Do not use on a prepared-content day or production.

Current source has no AI network integration. The unused generation_runs table remains in the original migration to avoid rewriting database history; it is not used by the local daily workflow.


## Revised challenge direction
Future releases follow CHALLENGE-DESIGN.md: evidence-led investigations for technically literate adults, structured findings and partial-credit grading. Today's legacy quizzes stay unchanged. The current runtime still uses the legacy format; the daily task must implement and verify compatible investigation support before releasing the new format. Unpublished future multiple-choice drafts are subject to replacement.

