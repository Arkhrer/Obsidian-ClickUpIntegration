# Context for Claude

Obsidian plugin (TypeScript) that brings ClickUp tasks into an Obsidian vault. Maintained by Arkhrer; it may be opened to outside contributions later.

## Language

- **Everything in the repository is in English**: code, identifiers, comments, UI strings, docs, commit messages and PR descriptions.
- Conversation with Arkhrer happens in Brazilian Portuguese.

## How to work in this repository

- **Learning mode.** Arkhrer is learning TypeScript and the Obsidian API (background in C/C++ and Python). Build the code **with him, step by step**, explaining each concept, instead of handing over finished files. Small steps, one idea at a time. Review what he writes before moving on.
- Follow the roadmap in `README.md` and tick the boxes when a step is done.
- ClickUp API notes live in `docs/clickup-api.md`; update them when something new is learned.
- Commits follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`…).

## Technical rules

- `src/main.ts` only handles the lifecycle and command registration. Logic goes into modules (`src/clickup/`, `src/render/`, `src/settings.ts`, …).
- Network access only through `requestUrl` from `obsidian` (works on mobile, no CORS issues). No `fetch`.
- The token lives only in `app.secretStorage` (ID `clickup-token`). Never in `data.json`, logs or error messages.
- File writes through `app.vault.process` (atomic), not `read` + `modify`.
- No runtime dependencies besides `obsidian` unless clearly justified.
- Pass methods as callbacks with arrow functions (`() => this.update()`), never as bare references.
- Before finishing a change: `npm run typecheck` and `npm run lint`.

## Conventions of the target vault

Note properties are lowercase Portuguese names without accents (`tipo`, `status`, `criado`, `atualizado`, `fonte`, `origem`, `projeto`, `clickup`); they belong to the user's vault, not to the code, and should become configurable. The generated note carries `origem: clickup`. Vault tasks use the Tasks plugin emoji format and the `#t` tag.
