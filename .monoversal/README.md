# Monoversal AI Builder — README

This folder (.monoversal) contains the spec-driven, gate-checked multi-agent framework artifacts.

Key points implemented:
- status-gate system via `status` fields in artifacts (draft → approved → in-progress → done)
- three-file context directory: context/overview.md, context/paths.md, context/constraints.md
- MODEL_STRATEGY.md mapping stages → models
- /src/app/api/monoversal/status (GET) and /src/app/api/monoversal/resume (POST)
- artifact folder structure under .monoversal/artifact/<project>

How to use:
- Edit `.monoversal/spec/<project>.md` and set `status: approved` to allow agents to begin.
- Call GET /api/monoversal/status?project=<project> to see current artifact statuses and next stage.
- Call POST /api/monoversal/resume with JSON {"project":"<project>"} to resume; the endpoint will refuse if the spec is not `approved`.

This is a minimal wired-in implementation. The Orchestrator should call these endpoints before starting stages and honor gating and stop rules.
