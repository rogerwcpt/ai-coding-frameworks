# North Wharf Ferries

One fictitious product, built four ways, from two starting points. The app is Next.js. Spec Kit, BMAD, and Squad each install a process. The fourth sample is the three files from the talk, `Context.md`, `Plan.md`, and `Roadmap.md`, run in [Pi](https://pi.dev/). Pi is the harness, not a fourth method. The same three files would run in any agent that reads markdown. Pi is here so that column has a named runner and an install line, the way the other three do.

The three packages can be compared with each other without this folder. They cannot be compared with the recommendation in the talk unless the files are built the same way, against the same brief. That is what `samples/pi/` is for.

The apps are not generated yet. This file is the brief, the install commands, and the checklist the outputs will be compared against. Install lines were taken from each project's README on 6 October 2026.

## Runtime

Use Node.js 22.19 or newer for the whole `samples/` tree. Pi's README requires 22.19. Squad's npm install requires 22.5, which 22.19 already satisfies. Next.js runs on it.

The app uses the current `create-next-app` defaults: TypeScript, App Router, Tailwind, ESLint, Turbopack. No database. Sailings and holds live in a TypeScript module.

Spec Kit's own CLI is not a Node install. It needs Python 3.11+ and [uv](https://github.github.io/spec-kit/install/uv.html). BMAD needs Node, npm, Git, and [uv](https://docs.astral.sh/uv/). Squad needs Node 22.5+ for the npm install, or its standalone install, which vendors Node. Squad also needs the GitHub Copilot CLI. Pi needs Node 22.19+ unless you use the pi.dev installer, which can install Node for you. The app all four produce is still this Next.js app.

## The brief

North Wharf Ferries is a one-counter harbour ferry. Two staff. No payments. A visitor can hold seats. Staff accept or release the hold, and can mark a sailing delayed.

Every output uses these routes:

- `/` today's sailings
- `/hold` request a hold: sailing, name, seat count
- `/staff` mark a sailing delayed, accept a hold, or release a hold

Acceptance, same for every folder:

- A visitor sees today's sailings and which are delayed.
- A visitor can request a hold and is shown a confirmation code.
- A delayed sailing cannot be held.
- Staff can accept or release a hold.
- Staff can mark a sailing delayed.

### Greenfield

Start from an empty folder and this brief. Spec Kit, BMAD, and Squad are told to create the Next.js app. Do not add an `AGENTS.md` to those three before the run, so the three-file method is not smuggled into them.

The Pi greenfield folder is the exception. Before launching Pi, write `Context.md`, `Plan.md`, and `Roadmap.md` there, plus the one-line `AGENTS.md` in the Pi section below. Pi loads `AGENTS.md` at startup. It does not load the other three names on its own.

### Brownfield

`samples/baseline/` is the starting app, created once and copied into each brownfield folder before that approach is started. The baseline already has `/` and a staff control that marks a sailing delayed. It has no holds.

The change is only this: add holds and accept/release, and leave the existing delay control working.

`create-next-app` currently emits an `AGENTS.md`. That file stays in the baseline, so every brownfield copy starts with the same one. In `samples/pi/brownfield/` only, append the one-line pointer from the Pi section after the copy. Leave the generated file untouched in the other three.

## Folders

```
samples/
  readme.md
  baseline/
  spec-kit/greenfield/
  spec-kit/brownfield/
  bmad/greenfield/
  bmad/brownfield/
  squad/greenfield/
  squad/brownfield/
  pi/greenfield/
  pi/brownfield/
```

`baseline/` and the eight project folders are created in a later pass. Each approach owns one folder. Greenfield and brownfield are the two starting points, not eight different products.

## Install

Run the framework command inside the sample folder you are about to build.

### Spec Kit

From the [Spec Kit README](https://github.com/github/spec-kit):

```bash
uv tool install specify-cli
specify init my-project --integration copilot
cd my-project
```

That example uses Copilot. These samples use Cursor. Inside the sample folder:

```bash
specify init --here --force --integration cursor-agent
```

Then, in the agent, constitution once, then specify, plan, tasks, implement, converge. Leave clarify, checklist, and analyze off unless a run gets stuck.

### BMAD

From the [BMAD README](https://github.com/bmad-code-org/BMAD-METHOD). Needs Node, npm, Git, and uv:

```bash
npx skills add bmad-code-org/BMAD-METHOD --skill bmad --skill bmod-core-tools --skill bmod-method --skill bmad-build
```

Open the sample folder in the coding tool. Ask the `bmad` skill to run `bmad setup`. Invoke `bmad-build` with the brief. Greenfield and the brownfield change both go through `bmad-build`. Do not open the full PRD path.

### Squad

From the [Squad README](https://github.com/bradygaster/squad). npm requires Node.js 22.5+:

```bash
npm install -g @bradygaster/squad-cli
squad init
copilot --agent squad --yolo
```

`--yolo` is the README's day-to-day flag so Copilot does not stop on every tool call. This sample cannot be run from Cursor alone. It needs the Copilot CLI.

Pin the models below before that Copilot session. Do not leave Squad's task-aware model selection on, or the run will not be this roster.

## Squad models

Set these in `.squad/config.json` under `agentModelOverrides`, and in each charter's `## Model` section when init creates named members.

- Lead: Opus 5.5
- Architectural work and review: Opus 4.8
- Frontend and backend implementation: Sonnet 5.5
- Tester, scribe, and docs: Haiku 4.5

Squad's published catalog on 6 October 2026 lists `claude-opus-5`, `claude-opus-4.8`, `claude-sonnet-5`, and `claude-haiku-4.5`. It does not list `5.5` ids. On the run, ask Copilot for the exact ids. If Opus 5.5 and Sonnet 5.5 are accepted, use them. If they are not in the catalog, stop and write that down in the comparison. Do not silently swap in Opus 5 or Sonnet 5.

## Pi

Pi has no project installer and no roster. Install the harness once, write the three files, and start it in the sample folder.

From the [Pi README](https://github.com/earendil-works/pi), checked 6 October 2026. The installer pins dependencies. The npm install does not, and it needs Node.js 22.19 or newer:

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

Then, inside the sample folder:

```bash
pi
```

Run `/login` once, for a subscription or an API key. Stay on one model for the whole session and write that model down in the comparison. Do not pin a model per role. Do not install a Pi package, and do not turn on sub-agents or plan mode. Those are extensions. This sample is the core harness plus the three files.

`AGENTS.md` in that folder, and only in the Pi folders:

```markdown
Read Context.md, Plan.md, and Roadmap.md before changing code. Those three files are the method.
```

On brownfield, append that line to the `AGENTS.md` copied from the baseline. On greenfield, that line is the whole file.

### Greenfield files

Write these before the first `pi` prompt. Context stays short. The brief lives in the plan. The roadmap is status, not a second spec.

`Context.md`:

```markdown
# Context

North Wharf Ferries. One counter, two staff, no payments. Holds only.

Next.js, TypeScript, App Router, Tailwind, ESLint. No database. Sailings and holds live in a TypeScript module.

Routes: `/` today's sailings, `/hold` request a hold, `/staff` delay a sailing and accept or release a hold.
```

`Plan.md`:

```markdown
# Plan

Build the North Wharf Ferries app from an empty folder.

A visitor sees today's sailings and which are delayed.
A visitor can request a hold (sailing, name, seat count) and is shown a confirmation code.
A delayed sailing cannot be held.
Staff can accept or release a hold.
Staff can mark a sailing delayed.

Out of scope: payments, accounts, a database, and any process beyond these three files.
```

`Roadmap.md`:

```markdown
# Roadmap

- [ ] Today's sailings, including which are delayed
- [ ] Request a hold and show a confirmation code
- [ ] Refuse a hold on a delayed sailing
- [ ] Staff accept or release a hold
- [ ] Staff mark a sailing delayed

Mark an item done only when it works in `next dev`. If a fact will still be true next month, add it to Context.md.
```

First prompt, after `/login`:

```text
Read Context.md, Plan.md, and Roadmap.md. Create the Next.js app and build the plan. When an item works, mark it in Roadmap.md. Keep Context.md short.
```

### Brownfield files

Copy `samples/baseline/` in first. Then write context from what the code actually does, not from memory of the greenfield brief.

`Context.md`:

```markdown
# Context

North Wharf Ferries. Next.js app copied from samples/baseline.

`/` lists today's sailings. Staff can already mark a sailing delayed. There are no holds. No database. Sailings live in a TypeScript module.

Do not restate the rest of the app here. Read the code.
```

`Plan.md`:

```markdown
# Plan

Add holds. Leave the existing delay control working.

A visitor can request a hold (sailing, name, seat count) and is shown a confirmation code.
A delayed sailing cannot be held.
Staff can accept or release a hold.

Out of scope: payments, accounts, a database, and any rewrite of the delay control.
```

`Roadmap.md`:

```markdown
# Roadmap

- [x] Staff mark a sailing delayed
- [ ] Request a hold and show a confirmation code
- [ ] Refuse a hold on a delayed sailing
- [ ] Staff accept or release a hold

Mark an item done only when it works in `next dev`. If a fact will still be true next month, add it to Context.md.
```

First prompt:

```text
Read Context.md, Plan.md, and Roadmap.md. Check Context.md against the code and correct it if it is wrong. Then build the plan. Do not replace the delay control.
```

## Comparison

After the runs, write `samples/comparison.md`. One block per folder. Same brief, same routes, same checks. It is a record, not a score.

- Process files created: `.specify/`, `_bmad/` or the installed skills, `.squad/`, or `Context.md`, `Plan.md`, and `Roadmap.md`
- App files created or changed
- Brownfield diff against `samples/baseline`: did the delay control survive
- The five acceptance checks, clicked through with `next dev`
- Anything the framework asked a person to decide

## Later pass

Create `samples/baseline` with:

```bash
npx create-next-app@latest baseline --yes
```

Record the Next.js version that command resolved. Copy the baseline into the four brownfield folders. Leave the Spec Kit, BMAD, and Squad greenfield folders empty except for this brief. In `samples/pi/greenfield/`, write the three files and the one-line `AGENTS.md` from the Pi section, and do not create the Next.js app yourself. Run each approach once. Fill in `samples/comparison.md`.
