MODEL_STRATEGY

Single place to map stages to model choices. Edit this file to change model allocations for the framework.

Stages -> Model

- Orchestrator: claude-code-x (or current orchestrator model)
- Plan: claude-code-x
- Database: claude-instant-1
- Design: claude-instant-1
- Backend: claude-code-x
- Integration: claude-code-x
- Frontend: claude-code-x
- Critic/Verifier: different-tier model (e.g., claude-instant-2) — MUST be pinned to a different model than the implementer for cross-model review

Notes:
- Pick concrete model names used by your runtime. The important rule: Critic/Verifier must be a different model than the implementation model for backend/frontend agents.
