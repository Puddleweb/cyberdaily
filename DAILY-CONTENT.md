# Daily CyberDaily content task

The user wants Codex itself to prepare content on this PC once daily, with no live AI API integration. The recurring run is 08:00 Europe/London. Read CHALLENGE-DESIGN.md first: its adult, evidence-led interactive training requirements supersede the original four-option quiz format.

## First run after the design change

Inspect the current app. If it still only supports legacy multiple-choice quizzes, implement and test the versioned investigation schema, evidence interactions, structured submission persistence and deterministic partial-credit grading described in CHALLENGE-DESIGN.md before releasing future content. This application work is part of the user's requested change, not an invitation for unrelated features. Preserve already released packs and learner results. Replace unpublished future legacy drafts where necessary, including the initial 2026-09-28 pack. Verify whether a pack was already served before changing it.

## Daily preparation

Prepare the next UTC date in content/daily-packs.json. Also check the current day's readiness: if today's pack is absent from the database and still an unpublished legacy draft, upgrade it before first release. Never change an already served day. Read the preceding 14 days to avoid repeated scenarios. Author one email investigation, one log investigation and one secure-code investigation directly through your own reasoning. Independently solve all tasks and review evidence and grading. Apply the quality gate in CHALLENGE-DESIGN.md. Do not generate more obvious four-option awareness quizzes as the default or disguise them as investigations.

Update scripts/validate-content.mjs to validate each supported format. Run validation, the local build and focused tests appropriate to schema or grading changes. Use the bundled modern Node runtime at C:/Users/paris/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe, with its directory first on PATH. Keep solutions server-side. Never execute arbitrary challenge or learner code.

Preserve the running preview and avoid duplicate servers. Restart a production preview only if required to load the changed build. Do not modify or delete existing learner attempts.

## GitHub delivery

After successful validation, commit only the intended content and necessary challenge-format changes and push to the existing private repository https://github.com/Puddleweb/cyberdaily on main. Inspect changes first. Never force-push, overwrite concurrent work, upload credentials or local databases, change visibility or deploy the website. If a valid pending commit only needs uploading, complete that upload instead of duplicating the pack.

Notify on successful preparation/upload, a failed check or required user action. Stay quiet if all required work is already complete. If the interactive engine is not ready, report that limitation explicitly; do not silently fall back to the rejected easy-quiz approach.
