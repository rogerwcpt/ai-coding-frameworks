# Comparison

Record of the 6 October 2026 run. Same brief, same routes, same checks. Not a score.

Runtime was Node.js v26.10.0. The baseline resolved to Next.js 16.3.8 and React 19.2.8.

The five checks:

1. A visitor sees today's sailings and which are delayed.
2. A visitor can request a hold and is shown a confirmation code.
3. A delayed sailing cannot be held.
4. Staff can accept or release a hold.
5. Staff can mark a sailing delayed.

## baseline

Starting app, not a framework run. `npx create-next-app@latest baseline --yes`, then `/` and a staff control that marks a sailing delayed. No `/hold`. Sailings live in `lib/sailings.ts`.

Checked in the browser on port 3010. The board lists four sailings. Marking the 09:00 sailing delayed disabled that button and `/` showed Delayed. `/hold` is not a route.

## spec-kit/greenfield

Initialized with `specify init --here --force --non-interactive --integration cursor-agent`. `--non-interactive` is not in the kickoff command. It was added so the installer would not wait on a menu. The integration is still Cursor.

Process files: `.specify/` (memory, workflows, templates, scripts, `feature.json`) and `.cursor/skills/speckit-*`. Feature artifacts in `specs/001-ferry-seat-holds/` (`spec.md`, `plan.md`, `tasks.md`, `research.md`, `data-model.md`, `quickstart.md`, `contracts/pages.md`, `checklists/requirements.md`). Constitution at `.specify/memory/constitution.md`.

App files: a new Next.js app. Store is `lib/ferry.ts`. Routes `app/page.tsx`, `app/hold/page.tsx`, `app/staff/page.tsx`. `create-next-app` wrote `AGENTS.md` on first boot. That file was removed and `next.config.ts` sets `agentRules: false`, so the greenfield folder still has no `AGENTS.md`.

Brownfield diff: not a brownfield folder.

Checks: the run reported all five passed in the browser on port 3111. A hold for Ada Boat returned `77CCLX`. A delayed 09:00 sailing was refused. Staff accepted `77CCLX` and released a second hold, `9RGUXH`. Converge pass 1 added task T026 (unknown hold code). Pass 2 reported Converged. T026 is checked in `tasks.md`.

Human decisions: the skills did not stop for an answer. The spec assumed a four-sailing day, parties of 1–12, six-character codes, no login, and no way to clear a delay.

Clarify, checklist, and analyze were not run, except the specify skill's own requirements checklist, which it completed as 16/16.

## spec-kit/brownfield

Same init command, merged into the baseline copy.

Process files: `.specify/` as above, plus `specs/001-add-sailing-holds/` (`spec.md`, `plan.md`, `tasks.md`, `research.md`, `data-model.md`, `quickstart.md`, contracts for the hold request, staff holds, and the delay control, and a requirements checklist).

App files changed: `lib/sailings.ts`, `app/actions.ts`, `app/staff/page.tsx`, `app/page.tsx`, `app/layout.tsx`. Added: `app/hold/page.tsx`, `app/hold-form.tsx`, `app/staff-holds.tsx`. `app/sailing-table.tsx` is identical to `samples/baseline/app/sailing-table.tsx`.

Delay control: survived. The Mark delayed button was not edited.

Checks: the run reported all five passed on port 3112. An on-time hold returned `U2RQ2YFR`. Converge reported Converged on the first pass. Rechecked in the browser on port 3121: 09:00 stayed Delayed, a hold on it was refused, Asha Reed on 11:15 got `6K5F5RYD`, and staff accepted then released that hold.

Human decisions: none of the skills stopped. The spec assumed an 80-character name, 1–20 seats, and statuses `requested`, `accepted`, `released`.

## bmad/greenfield

Skills installed with the kickoff `npx skills add` command, into `.agents/skills/` (`bmad`, `bmad-build`, `bmod-core-tools`, `bmod-method`). `bmad setup` created `_bmad/`. Setup printed no config questions, so no answers were invented. The absent skills (PRD, agents, party mode, and the rest) were left uninstalled.

`bmad-build` was pinned to `workflow.route=oneshot`. The plan is `_bmad-output/plan-north-wharf-ferries.md` with `status: built` and `route: oneshot`. A render snapshot is under `_bmad/render/bmad-build/`.

App files: new Next.js app. Store is `lib/ferry.ts`. Routes under `app/`, `app/hold/`, and `app/staff/`. This folder does have the `AGENTS.md` that `create-next-app` emits.

Checks: the run reported all five passed on port 3113. Naledi, 11:15, 2 seats, got `NW-PR8Z`. The 09:00 sailing was already delayed and was refused. Staff moved the hold through pending, accepted, and released, and marked 14:00 delayed. A quick review fixed a stale `?error=` query. The thorough review lenses were skipped.

Human decisions: no initiative was set, so the workflow treated the work as loose. The plan assumed the 09:00 sailing starts delayed, codes like `NW-` plus four characters, seat count at least 1, and no login.

The run also made two local git commits on a branch named `samples` (`bf5f1f2`, `e6844ac`). Those commits are not pushed. The working checkout was moved back to `main`, with the files kept.

## bmad/brownfield

Same skill install and setup. Plan: `_bmad-output/plan-holds-accept-release.md`, `status: built`, `route: oneshot`.

App files added: `app/hold/page.tsx`, `app/hold/hold-form.tsx`. Changed: `lib/sailings.ts`, `app/actions.ts`, `app/page.tsx`, `app/staff/page.tsx`, `app/layout.tsx`. `app/sailing-table.tsx` matches the baseline byte for byte.

Delay control: survived.

Checks: the run reported all five passed on port 3114. Ada, 09:00, 2 seats, got `2UMEU6`. `npm run lint` exited 0. Rechecked in the browser on port 3122: 09:00 showed Delayed on `/` and on the staff desk, a hold on it was refused, Naledi on 11:15 got `9EDZHC`, and staff accepted then released that hold.

Human decisions: same loose-work path, no PRD. Assumed six-character codes, seat count at least 1, and that delaying a sailing later does not cancel a hold that already exists.

## squad/greenfield

`squad init --preset default --no-workflows`. Plain `squad init` waits for a conversation, so the preset flag was used. `--no-workflows` skipped GitHub Actions files. Squad CLI 1.0.0.

Process files: `.squad/` (config, team, routing, decisions, memory, ceremonies, and the default preset agents: lead, reviewer, security, docs, devrel, scribe, ralph, Rai, fact-checker). Also `.github/skills`, `.vscode/settings.json`, `.mcp.json`, `.copilot/mcp-config.json`. Because the meetup repo is the git root, init wrote `.github/agents/squad.agent.md` there, not inside this folder.

`.squad/config.json` is still `{ "version": 1 }`. The preset charters have no `## Model` section. The model catalog shipped in `.squad/templates/skills/model-selection/SKILL.md` lists `claude-opus-5`, `claude-opus-4.8`, `claude-sonnet-5`, and `claude-haiku-4.5`. It does not list Opus 5.5 or Sonnet 5.5. The `copilot` command is not installed, so Copilot was not asked for ids. The run stopped there. The requested ids were not swapped for Opus 5 or Sonnet 5, and `agentModelOverrides` was left unset. Task-aware selection is still the default.

App files: none. `brief.md` only. No acceptance checks.

Human decisions: the model ids, and a Copilot login, which nobody could answer in this session.

## squad/brownfield

Same init and the same stop. The baseline copy is unchanged apart from Squad's files and `brief.md`. The delay control is the copied one, not a Squad edit. No holds were added. No acceptance checks.

## pi/greenfield

Process files, written before any Pi session: `Context.md`, `Plan.md`, `Roadmap.md`, and a one-line `AGENTS.md`. Roadmap items are still unchecked.

Pi is installed (Homebrew, 1.0.0). `pi --list-models` reported no models, and no provider API key was set in the environment. `/login` needs a person. The prompt was not sent. The Next.js app was not created here.

No acceptance checks.

## pi/brownfield

Baseline copy, plus `Context.md`, `Plan.md`, and `Roadmap.md`. The one-line pointer was appended to the generated `AGENTS.md`. The delay item on the roadmap is checked. The hold items are not. The app is still the baseline: delay works, holds do not, because Pi was not run. Same login block as the greenfield folder.
