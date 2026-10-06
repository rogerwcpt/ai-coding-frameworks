# North Wharf Ferries

One fictitious product, built three ways, from two starting points. The app is Next.js. The three approaches are Spec Kit, BMAD, and Squad.

The apps are not generated yet. This file is the brief, the install commands, and the checklist the outputs will be compared against. Install lines were taken from each project's README on 6 October 2026.

## Runtime

Use Node.js 22.5 or newer for the whole `samples/` tree. Squad's npm install requires it, and Next.js runs on it.

The app uses the current `create-next-app` defaults: TypeScript, App Router, Tailwind, ESLint, Turbopack. No database. Sailings and holds live in a TypeScript module.

Spec Kit's own CLI is not a Node install. It needs Python 3.11+ and [uv](https://github.github.io/spec-kit/install/uv.html). BMAD needs Node, npm, Git, and [uv](https://docs.astral.sh/uv/). Squad needs Node 22.5+ for the npm install, or its standalone install, which vendors Node. Squad also needs the GitHub Copilot CLI. The app all three produce is still this Next.js app.

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

Start from an empty folder and this brief. The framework creates the Next.js app. Do not add an `AGENTS.md` before the run.

### Brownfield

`samples/baseline/` is the starting app, created once and copied into each brownfield folder before that framework is initialized. The baseline already has `/` and a staff control that marks a sailing delayed. It has no holds.

The change is only this: add holds and accept/release, and leave the existing delay control working.

`create-next-app` currently emits an `AGENTS.md`. That file stays in the baseline, so every brownfield copy starts with the same one.

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
```

`baseline/` and the six project folders are created in a later pass. Each approach owns one folder. Greenfield and brownfield are the two starting points, not six different products.

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

## Comparison

After the runs, write `samples/comparison.md`. One block per folder. Same brief, same routes, same checks. It is a record, not a score.

- Process files created: `.specify/`, `_bmad/` or the installed skills, `.squad/`
- App files created or changed
- Brownfield diff against `samples/baseline`: did the delay control survive
- The five acceptance checks, clicked through with `next dev`
- Anything the framework asked a person to decide

## Later pass

Create `samples/baseline` with:

```bash
npx create-next-app@latest baseline --yes
```

Record the Next.js version that command resolved. Copy the baseline into the three brownfield folders. Leave each greenfield folder empty except for this brief. Run each framework once. Fill in `samples/comparison.md`.
