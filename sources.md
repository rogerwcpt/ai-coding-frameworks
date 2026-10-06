# Sources

Figures and quotations used in the meetup deck. Retrieved **6 October 2026**.

The slides are in [deck/ai-driven-development.pptx](deck/ai-driven-development.pptx). Rebuild them with `python3 deck/build_deck.py` after `python3 -m pip install python-pptx`.

Star counts, creation dates, and push timestamps come from the GitHub REST API (`GET /repos/{owner}/{repo}`) on that date. Licenses were checked against each repository's `LICENSE` file. Where a docs page and the API disagree, the deck uses the API for stars and the reference table for integration count, and says so.

## Spec Kit

- Repository: <https://github.com/github/spec-kit>
- API, 6 October 2026: 140,313 stars, created 21 August 2025 (`2025-08-21T22:54:31Z`), pushed 5 October 2026 (`2026-10-05T18:15:03Z`), license MIT, homepage <https://github.github.com/spec-kit/>
- Release [v1.1.0](https://github.com/github/spec-kit/releases/tag/v1.1.0), published 2 October 2026 (`2026-10-02T18:02:50Z`)
- [README](https://github.com/github/spec-kit/blob/main/README.md): Python 3.11+, [uv](https://github.github.io/spec-kit/install/uv.html), and a supported agent. Install shown as `uv tool install specify-cli` then `specify init my-project --integration copilot`. Core loop: "Constitution once per project; specify → plan → tasks → implement → converge per feature." Clarify, checklist, and analyze are described as extra quality gates. Bug fixing and idea assessment are separate entry points, not mandatory phases.
- [Supported integrations](https://github.github.io/spec-kit/reference/integrations.html): the "Supported AI Coding Agents" table lists 40 named agents plus a `generic` row. Counted by hand on 6 October 2026. The [docs homepage](https://github.github.io/spec-kit/) still says "38 integrations" and "130K+ GitHub stars". The deck uses the table and the API.
- [Adopting Spec Kit in an existing project](https://github.github.io/spec-kit/guides/existing-projects.html): "You do not need to recreate an existing system from specifications before using Spec Kit." "Do not make 'document the entire existing system' your first feature unless that inventory is itself the intended deliverable." "The codebase remains implementation context. The new `spec.md` defines the change you intend to make, not a retroactive specification of every existing behavior."

## BMAD

- Repository: <https://github.com/bmad-code-org/BMAD-METHOD>
- API, 6 October 2026: 53,827 stars, created 13 April 2025 (`2025-04-13T14:54:25Z`), pushed 6 October 2026 (`2026-10-06T02:10:22Z`). The API `license.spdx_id` is `NOASSERTION`. The [LICENSE](https://github.com/bmad-code-org/BMAD-METHOD/blob/main/LICENSE) file is the MIT license, copyright 2025 BMad Code, LLC, with an extra contributor paragraph.
- Docs: <https://docs.bmad-method.org/>. Wider site: <https://bmadcode.com>
- Release [v6.12.1](https://github.com/bmad-code-org/BMAD-METHOD/releases/tag/v6.12.1), published 4 October 2026 (`2026-10-04T19:29:43Z`)
- Release [v6.11.0](https://github.com/bmad-code-org/BMAD-METHOD/releases/tag/v6.11.0), published 10 August 2026 (`2026-08-10T17:49:41Z`): "`bmad-quick-dev` → `bmad-build`"; retired skill ids "keep working through a forwarding shim in `v6-shims/` until the v7 cut." Same notes: "The adversarial reviewer drops its persona for a method. A/B piloting on Claude and Codex showed the 'cynical, jaded reviewer' framing made no difference to residual-bug hit rate, while requiring at least ten concrete findings and asking what is missing did."
- [README](https://github.com/bmad-code-org/BMAD-METHOD/blob/main/README.md): "Small changes go straight to build." Install needs a skills-capable tool and uv. Skills CLI, with Node.js, npm, and Git: `npx skills add bmad-code-org/BMAD-METHOD`. Also documents a Claude Code plugin marketplace and `codex plugin marketplace add bmad-code-org/bmad-plugins`. Delivery-loop image text: a vague notion starts at Clarify, a big clear idea at Plan, and a small change at Build and verify; Learn and adjust loops back to Plan.
- [Party mode](https://docs.bmad-method.org/explanation/party-mode/): default `session` mode is "One model voices every persona inline." "The choice matters because one model voicing five personas can quietly converge: they share a mind." Spawning modes "cost more but protect independence."
- [Define requirements and a specification](https://docs.bmad-method.org/plan/define-requirements-and-a-specification/): `bmad-spec` writes five fields: Why, Capabilities (each with an intent and a success condition), Constraints, Non-goals, and Success signal. "The spec writes the contract; it does not help you figure out what you want." Input too thin to use is sent to `bmad-prd`.
- [Start in an existing codebase](https://docs.bmad-method.org/existing-codebases/start-in-an-existing-codebase/): "Most of the knowledge about this application is already encoded in its source." "Feeding them textual descriptions of things they can already read there creates contradiction, ambiguity, and context-window bloat." "`bmad-project-context` writes a small verified block of agent instructions into your repo's `AGENTS.md`." "The earlier `bmad-document-project` workflow is deprecated."

## Squad

- Repository: <https://github.com/bradygaster/squad>
- API, 6 October 2026: 3,251 stars, created 6 February 2026 (`2026-02-06T07:11:36Z`), pushed 6 October 2026 (`2026-10-06T03:06:27Z`), license MIT, homepage <https://bradygaster.github.io/squad/>
- Release [v1.0.1](https://github.com/bradygaster/squad/releases/tag/v1.0.1), published 4 October 2026 (`2026-10-04T18:00:00Z`)
- [README](https://github.com/bradygaster/squad/blob/dev/README.md) (default branch `dev`): "Squad gives you a human-directed AI development team through GitHub Copilot." "It's not a chatbot wearing hats. Each team member runs in its own context, reads only its own knowledge, and writes back what it learned so the work stays inspectable." npm install: Node.js 22.5+, `npm install -g @bradygaster/squad-cli`, then `squad init`, then `copilot --agent squad`. Standalone installs "vendor Node.js, so they do not require Node.js."
- [Your team](https://bradygaster.github.io/squad/docs/concepts/your-team/): a tester is included "If tests exist or test deps detected." "AI agents have a `charter.md` (identity, expertise, voice — compiled into the system prompt at spawn time)."
- [Parallel work and models](https://bradygaster.github.io/squad/docs/concepts/parallel-work/): "It also picks the right AI model for each agent based on what they're doing." Selection layers include a charter `## Model` section and task-aware auto selection. "Default: `gpt-5.6-luna` — cost wins when in doubt." The role table puts implementation roles on a standard tier and DevRel, Scribe, and Git/Release on a fast tier. Eager parallelism's trade-off is "increased API cost."
- [Switching models](https://bradygaster.github.io/squad/docs/scenarios/switching-models/): a worked example pins the tester to the fast/cheap tier, with the line that the tester does not need the premium model to write tests.

Model names on those Squad pages are quoted in this addendum only. They are not on the spoken slides, because a named catalog is the part that goes stale.

## Pi

Pi is the example harness for the three-file column. It is not a fourth method.

- Repository: <https://github.com/earendil-works/pi>
- API, 6 October 2026: 112,833 stars, created 9 August 2025 (`2025-08-09T14:03:50Z`), pushed 6 October 2026 (`2026-10-06T09:30:10Z`), license MIT
- Release [v1.0.4](https://github.com/earendil-works/pi/releases/tag/v1.0.4), published 5 October 2026 (`2026-10-05T22:03:50Z`)
- <https://pi.dev/>: "Pi is a minimal agent harness. Adapt Pi to your workflows, not the other way around." "Pi ships with powerful defaults but skips features like sub-agents and plan mode." "15+ providers, hundreds of models." Install lines include `curl -fsSL https://pi.dev/install.sh | sh` and `npm install -g --ignore-scripts @earendil-works/pi-coding-agent`. `AGENTS.md` is loaded from the user agent directory, parent directories, and the current directory.
