Constraints for monoversalhub (binding)

These constraints are set at project start and are BINDING for Design and Backend agents.

- Database: Neon (dev / preview instances only)
- Preview: single shared Vercel preview link + Neon preview DB (wiped after project completion)
- Payments: Paystack (if payments are needed)
- Styles: inline styles only (no Tailwind, CSS Modules, or external frameworks)
- Contact pattern: WhatsApp-first (do not implement email-first flows)
- Testing: every stage must include automated tests; a stage is not complete until tests pass
- Integrations: Integration agent must pick from curated list in the tool (do not invent external APIs)
- Hosting: Next.js on Vercel (preview & production)

Agents MUST treat this file as binding. If an agent finds an unresolvable conflict with constraints, it must stop and flag for human review.
