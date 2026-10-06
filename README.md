# Do the new AI frameworks earn their keep?

SOFTWARE ENGINEERING MEETUP

Spec Kit, BMAD, Squad, and three files you keep current.

Requirement → Short plan → Code → Update the plan

Planning is worth more. The artifact should be shorter.

[Slides](deck/ai-driven-development.pptx) · [Sources](sources.md)

## Intent got expensive

**Written once.** A long specification. It goes stale. The agent still treats it as the truth, and implements the stale parts with confidence.

**Kept current.** A short plan. One change, with acceptance, updated when the work moves. This is the planning that got more valuable.

## Four approaches

### Spec Kit

140,313 GitHub stars. Started 21 Aug 2025. [github.github.com/spec-kit](https://github.github.com/spec-kit/). Python 3.11+ and uv. A spec through plan, tasks, implementation, and a check.

### BMAD

53,827 GitHub stars. Started 13 Apr 2025. [docs.bmad-method.org](https://docs.bmad-method.org/). Node, npm, and uv. Planning depth that is supposed to size itself to the change.

### Squad

3,251 GitHub stars. Started 6 Feb 2026. [bradygaster.github.io/squad](https://bradygaster.github.io/squad/). Copilot, plus Node or a standalone install. A roster of specialists that lives in the repository.

### Three files

3 files. Context, Plan, Roadmap. No project installer. Any harness that reads markdown. Pi is the example harness. 112,833 stars. 15+ providers. Started 9 Aug 2025.

## Specify the change, then build it

Specify → Plan → Tasks → Implement → Converge

Constitution once per project. Only if those principles are already true.

Python 3.11+, uv, and one of 40 named agents. A generic integration covers the rest.

Clarify, checklist, and analyze are extra gates. The core loop stands without them.

On an existing codebase, the spec is the next change. Leave the rest of the system in the code.

Started 21 Aug 2025 · 140,313 stars · v1.1.0 on 2 Oct 2026 · MIT

## Size the planning to the change

Clarify → Plan → Build and verify

Vague notion, big idea, or small change. Learn and adjust loops back to plan.

Node, npm, and uv, plus a tool that loads skills. Claude and Codex have plugin marketplaces too.

Small changes go straight to build. Open the PRD and architecture path when the change is actually large.

Personas and party mode sit on top of the loop. One model voicing five personas shares a mind.

Started 13 Apr 2025 · 53,827 stars · v6.12.1 on 4 Oct 2026 · MIT

## A Copilot roster in the repo

Discover → Propose a roster → Spawn a role → Human reviews

The roster lives in `.squad/`. Charters, decisions, and history are files.

Each member has its own context. The charter is compiled into the system prompt.

A tester role is that prompt. Separate context helps. The job title leaves the model as it was.

GitHub Copilot, plus their CLI. npm wants Node 22.5+. The standalone install vendors Node.

Started 6 Feb 2026 · 3,251 stars · v1.0.1 on 4 Oct 2026 · MIT

## Context, plan, roadmap

Context.md → Plan.md → Roadmap.md

Mark the item done. Fold anything still true next month back into context.

**Context.md.** Durable facts only. Stack, conventions, domain terms, constraints. Kept short.

**Plan.md.** The current change. What, why, acceptance, approach, and out of scope.

**Roadmap.md.** Phases and items with status. Updated when an item is actually done.

## Greenfield and brownfield

**Greenfield.** Write decisions down as you make them. Spec Kit starts at specify. BMAD plans a big idea and builds a small change. Squad proposes a team from the description. The three files grow as decisions stick.

**Brownfield.** The code already holds the system. Spec Kit specs the next slice. BMAD warns against restating what the agent can read. The three files verify a short context and plan the change.

Shared commands → Spec Kit. Optional depth → BMAD. Already on Copilot → Squad. You will keep three files true → stay with the files.

## Side by side

| | Spec Kit | BMAD | Squad | Three files |
| --- | --- | --- | --- | --- |
| Unit of work | A feature | A sized change | A task for a role | One change |
| Artifacts | spec, plan, tasks | spec, or a PRD if large | charter, decisions, history | Context, Plan, Roadmap |
| Moving parts | CLI and skills | Skills and agents | Roster and Copilot | Three markdown files |
| In common | Intent, plan, tasks, a check | Intent, plan, build, a check | A task, decisions, a review | Intent, plan, tasks, a check |
| Lock-in | .specify/ on many agents | Skill names on many tools | GitHub Copilot | Any markdown reader |
| Install | Python 3.11+ and uv | Node, npm, and uv | Copilot and Node 22.5+, or standalone | Nothing |
| Greenfield | Specify, then plan | Plan the big idea | Describe it, get a team | Write context as you decide |
| Brownfield | The next slice only | Do not restate the code | Scan the repo, propose roles | Verify context from the code |
| Best used when | Shared commands and a paper trail | Depth you can leave off | You already live in Copilot | You will keep three files true |

## They already agree

| | Intent | Plan | Tasks | Check |
| --- | --- | --- | --- | --- |
| Spec Kit | Specify | Plan | Tasks | Converge |
| BMAD | Spec | Plan, if it is large | Build | Verify |
| Squad | The request | Decisions file | Routed work | A review |
| Three files | What and why | Approach and bounds | The task list | Acceptance |

Written intent. A plan. Tasks. A check.

## What does not pay rent

1. **A tester charter.** BMAD’s v6.11 notes: a cynical reviewer persona did not change the residual-bug hit rate. Concrete findings did.
2. **A model pinned to a role.** Squad maps roles onto price tiers, and a charter can pin a model. The map rots as models ship. Keep one strong model.
3. **A phase gate for a known change.** If the requirement is already bounded, more ceremony writes more pages before the same check.

## One change in flight

**The short path.** One bounded change, then update the record. Spec Kit runs the loop per feature. BMAD sends a small change straight to build. Squad waits for a person to accept the work.

**The heavy setting.** The whole product, specified before any code. That setting recreates a phase gate. Each project also ships a short path, because the long one is too much.

## Lock-in and upkeep

**Model.** Low for Spec Kit and BMAD. High for Squad: the product is a Copilot team.

**Framework.** `.specify/`, BMAD skill names, and `.squad/` stay behind when you leave.

**Markdown.** Context, plan, and roadmap move to the next harness. That lock-in is cheap.

All four repos were pushed on 5 or 6 Oct 2026. BMAD renamed its build command in August and is shimming skills toward a v7 cut.

## How a requirement moves

BA requirement → Plan.md → Build → Check → Roadmap

**Context.md.** Durable facts. Correct it when it is wrong. Do not let it become a second codebase.

**Plan.md.** One change. The requirement is the input. Acceptance is the check.

**Roadmap.md.** The agile record. Update the status when the item is done. It is not a freeze.

## Same loop, both codebases

**Greenfield.** Context is the decisions. Write a fact when it sticks. Plan the change you were given. Mark the roadmap when it ships.

**Brownfield.** Context is verified from the code. A short checked context. A plan for the next change. Restating the system creates a second, staler source.

## If the requirement is unknown

Discover until the change is bounded. Then write the plan.

Ask → Bound the change → Plan.md

Uncommon when a product team is feeding the work. Fatal when it is skipped. Every framework fails here the same way: a thick spec made of guesses is still a guess.

## If you still want a package

**Use.** Spec Kit’s core loop. Specify, plan, tasks, implement, converge. One feature at a time. Their five-step cousin in BMAD is the same short spec: why, capabilities, constraints, non-goals, success.

**Leave off.** The extra machinery. Gates you do not need. A constitution you do not mean. A roster adopted to grow a better tester. BMAD’s full path for a change you already understand.

## Keep the plan current.

Do not adopt a department of prompts.

Context.md → Plan.md → Roadmap.md

The files are the method. The harness is the one you already have.

## Sources, retrieved 6 Oct 2026

### Spec Kit

[github.com/github/spec-kit](https://github.com/github/spec-kit) — API 6 Oct 2026

140,313 stars. Created 21 Aug 2025. Pushed 5 Oct 2026. MIT.

Release v1.1.0 published 2 Oct 2026.

README: Python 3.11+, uv; constitution once; specify → plan → tasks → implement → converge.

Integrations table: 40 named agents, plus generic. Docs homepage still says 38 and 130K+ stars.

Existing-project guide: do not recreate the system as specs; spec the next change.

### BMAD

[github.com/bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) — API 6 Oct 2026

53,827 stars. Created 13 Apr 2025. Pushed 6 Oct 2026.

LICENSE file is MIT. API SPDX field is NOASSERTION.

Release v6.12.1 on 4 Oct 2026. v6.11.0 on 10 Aug 2026 renamed quick-dev to build; shims until v7; persona A/B.

README: skills CLI, Claude and Codex marketplaces, uv. Small changes go straight to build.

Delivery loop: clarify, plan, build and verify; learn loops back.

[docs.bmad-method.org](https://docs.bmad-method.org/) — existing codebase, party mode, define a specification.

Party mode: one model voicing five personas can quietly converge.

Spec kernel: Why, Capabilities, Constraints, Non-goals, Success signal.

Existing codebase: restating readable code bloats the window. document-project is deprecated.

Full URLs are in [sources.md](sources.md), with the same retrieval date.

### Squad

[github.com/bradygaster/squad](https://github.com/bradygaster/squad) — API 6 Oct 2026

3,251 stars. Created 6 Feb 2026. Pushed 6 Oct 2026. MIT.

Release v1.0.1 published 4 Oct 2026. Homepage [bradygaster.github.io/squad](https://bradygaster.github.io/squad/).

README: Copilot team; not a chatbot wearing hats; each member has its own context.

npm install wants Node.js 22.5+. Standalone install vendors Node. `copilot --agent squad`.

Your Team: charter.md is identity, expertise, and voice, compiled into the prompt.

Parallel Work and Models: per-role and per-task model routing; cost wins when in doubt.

Switching Models scenario: tester on the fast tier.

### Pi, the example harness

[github.com/earendil-works/pi](https://github.com/earendil-works/pi) — API 6 Oct 2026

112,833 stars. Created 9 Aug 2025. Pushed 6 Oct 2026. MIT.

Release v1.0.4 published 5 Oct 2026. Site [pi.dev](https://pi.dev/).

pi.dev: minimal harness; 15+ providers; skips sub-agents and plan mode in the core.

Install: `curl https://pi.dev/install.sh`, or `npm i -g @earendil-works/pi-coding-agent`.

Pi is not a fourth method. It is one harness that will read the three files.

Star counts and timestamps are from the GitHub REST API on 6 Oct 2026. Integration count is a manual count of the Spec Kit integrations table the same day.
