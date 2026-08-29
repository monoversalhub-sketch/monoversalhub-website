status: draft

# Plan for Monoversal Hub (initial draft)

## Summary
Create a minimal, spec-driven plan to implement the Monoversal Hub website according to the binding constraints in .monoversal/context/constraints.md. This plan will be used by the Plan agent to break work into tasks for the Design, Database, Backend, Integration, and Frontend agents.

## Goals
- Satisfy constraints: Neon DB for preview, inline styles only, Paystack if payments needed, WhatsApp-first contact.
- Produce an actionable list of tasks and acceptance criteria per stage.
- Produce automated test outlines per stage so the orchestrator can validate completion.

## Tasks (by stage)

1. Design
   - Deliver: design.md with component sketches and a small mockup image folder (mockups/)
   - Status: draft
   - Acceptance: All visual components described and accessible; mockups show responsive layout for 3 breakpoints.
   - Tests outline: visual snapshot test stubs (describe what to assert) and presence of component docs.

2. Database
   - Deliver: schema.sql or schema description file using Neon conventions; seed data for preview.
   - Status: draft
   - Acceptance: DB schema created, migration notes, preview connection string documented in neon/ and .env.example.
   - Tests outline: schema existence checks and sample query result tests.

3. Backend
   - Deliver: API endpoints under src/app/api/* for testimonials, messages, waitlist, admin hooks.
   - Status: draft
   - Acceptance: endpoints return expected shape per spec; respect constraints (Neon only for DB calls).
   - Tests outline: unit tests for handlers (mock DB) and integration tests hitting preview Neon instance.

4. Integration
   - Deliver: integration map and code for chosen curated APIs (e.g., Paystack, WhatsApp). No invented APIs.
   - Status: draft
   - Acceptance: integration adapters implemented with environment-variable-driven configs.
   - Tests outline: mocked integration tests, config validation.

5. Frontend
   - Deliver: React components under src/, inline styles only; pages wired to API endpoints.
   - Status: draft
   - Acceptance: pages render correctly and connect to APIs; deploy preview on Vercel works.
   - Tests outline: render tests, e2e smoke tests against preview.

## Timeline (suggested)
- Day 1: Plan (this artifact) + Design kickoff
- Day 2: Design + Database schema
- Day 3: Backend + Integration stubs
- Day 4: Frontend + tests + preview

## Initial test checklist (agent-run)
- Each stage produces automated test files in the artifact directory or under tests/ matching stage name.
- Orchestrator will pass `testsPassed=true` when agents confirm tests pass in CI or test-run command.

## Notes for agents
- Read .monoversal/context/constraints.md and treat constraints as binding.
- Mark outputs with a `status` header line.

