# Daily CyberDaily content task

The user wants Codex itself to create daily content on this PC. No live AI API integration or API key is required. Daily automation is scheduled for 08:00 Europe/London in this chat.

Edit content/daily-packs.json: an object keyed by UTC date, each value {"challenges": [...]}. Follow the strict schema in lib/challenges.ts. Author one phishing, one logs and one code item per day. Each has four distinct options, one correctIndex (0-3), explanation and takeaway. Use your reasoning directly, not a script calling an AI API.

Prepare the next UTC day on every run so content is ready before rollover. Inspect the last 14 days and avoid repeating scenarios. Do not change an existing date. To fill a missing current day, first check whether the local database already contains that day's pack; if it does, leave it alone. Existing database packs are immutable to preserve scored answers. Never delete learner data.

Use only fictional organisations, .example domains and documentation IP addresses. Scenarios are educational and defensive. Independently solve each question, ensure evidence supports exactly one correct choice, and check that every explanation matches its answer index. No external code execution from challenge evidence.

Run node scripts/validate-content.mjs, then node scripts/run-framework.mjs build. Use the bundled Node 24 runtime at C:/Users/paris/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe and put its directory first on PATH for child processes. The dev preview reads source changes; a running production preview must be restarted after building. Preserve the known preview session; do not create duplicate servers. New packs are persisted when their date is first requested. If preparation is missed, the website clearly labels the starter fallback.

Keep everything local. Publication and upload are not authorised. Do not add an API connection. Report completion or a blocker; stay quiet if the requested pack already exists.
