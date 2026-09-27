# CyberDaily challenge design standard

## Product direction

CyberDaily is practical cybersecurity training for technically literate adults, cybersecurity students and aspiring junior analysts. The user rejected the initial obvious four-option awareness quizzes. Future challenges must demand investigation, evidence and reasoning. Use university / junior analyst level as the default; make difficulty explicit and increase it through inference, not obscure trivia or trick wording.

Preserve the current day's exercises, answer keys and attempts. This requirement does not freeze unpublished future starter-style drafts, including the original 2026-09-28 multiple-choice pack. Replace those drafts with the new format before their first release.

## Required experience

- Phishing / email investigation: inspect raw headers, sender and reply-to identities, authentication results, a message thread and safe URL text. Include plausible benign details and avoid marking every unusual email malicious. Ask learners to identify the relevant evidence and submit concrete findings. Authentication passing alone must not be treated as proof of trustworthiness.
- Log investigation: correlate a substantive set of timestamped events across at least two relevant sources, with normal activity mixed in. Provide filtering/search or selectable rows, then ask for a timeline, affected account/session, first supported suspicious event and defensible conclusion. Do not make the answer obvious from labels such as ATTACK_DETECTED.
- Secure-code investigation: show a coherent multi-function code sample with relevant context, including existing checks. Have the learner identify the vulnerable line or missing check, trace the input or authorisation boundary, and construct a fix through constrained patch editing or structured selections. Never execute arbitrary user-supplied code on the host or server.

Each challenge should require roughly 10–20 minutes of genuine analysis for its stated audience, as a design target rather than a measured claim. A reader should not solve it from the question title, generic security advice or one conspicuously sensible option. The three challenge categories can remain; the interactions and reasoning must change.

## Assessment without a live AI API

Pre-author deterministic grading rules alongside each challenge. Use structured findings, evidence IDs, ordered event IDs, typed values with documented normalisation and constrained patches. Grade components with partial credit and display exactly what earned or lost marks. Optional written rationale can be saved for reflection but must not be labelled automatically assessed unless a defensible supported rubric is implemented. Do not grade free-form prose using a simplistic keyword check presented as understanding.

Make hints available in stages, with their scoring impact shown before use. Permit meaningful revision; distinguish practice attempts from the scored attempt and preserve prior results. Final debriefs should reconstruct the reasoning, explain plausible alternative hypotheses and identify what cannot be concluded from the available evidence.

## Content quality gate

Independently solve every task using only the displayed material. Check evidence consistency, timestamps, answer acceptance and alternative valid findings. All necessary facts must be supplied or explicitly declared prerequisites. Ambiguous cases require an uncertainty-aware answer rather than an invented certainty. Use fictional organisations, .example domains and documentation IPs. Keep code and URL evidence inert.

## Interface direction

Use a professional investigation workspace: evidence viewer, findings, progress and debrief. Remove childish encouragement and unsupported short completion-time promises for the new format. Prefer useful language such as Case brief, Evidence, Findings and Review. Do not merely increase text length or make the existing multiple-choice distractors less obvious.

## Implementation requirement

The current schema, UI and grading endpoint only support one four-choice answer. They cannot deliver this experience through copy changes alone. Add a versioned investigation schema, compatible rendering, per-component server-side grading and persistence for structured submissions. Keep the legacy format working for already released days. Never send solutions or grading rules in the pre-submission payload or client bundle. Cover hidden answer rules, partial-credit calculations, duplicate submission protection and legacy compatibility with focused tests.

Future content may only be labelled interactive after its interaction and grading path work end to end. If implementation or validation fails, report the blocker rather than silently reverting to more awareness quizzes or claiming the redesign shipped.
