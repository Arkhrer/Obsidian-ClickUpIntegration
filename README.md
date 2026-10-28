# ClickUp Integration for Obsidian

An Obsidian plugin that mirrors your ClickUp tasks into a note in your vault and, later on, lets you update them without leaving Obsidian.

> Status: early development (0.0.x). Not published in the community plugin directory.

## Requirements

- Node.js 20.11 or newer, with npm
- Obsidian 1.11.4 or newer (needed for `app.secretStorage`)
- The Obsidian CLI registered, for `npm run reload` (optional)

## Getting started

```bash
npm install      # dev dependencies
npm run dev      # links the build into the test vault and compiles in watch mode
```

Open `test-vault/` in Obsidian (**Open folder as vault**), turn on community plugins and enable **ClickUp Integration**. After changing the code, with `dev` running:

```bash
npm run reload   # reloads the plugin in the running Obsidian
```

## Scripts

| Command               | What it does                                                                   |
| --------------------- | ------------------------------------------------------------------------------ |
| `npm run dev`       | Links the build into the test vault + watch build with sourcemaps              |
| `npm run build`     | Type check + production build (minified)                                       |
| `npm run typecheck` | Type check only                                                                |
| `npm run lint`      | ESLint with the official Obsidian rules                                        |
| `npm run link`      | Recreates the test-vault links                                                 |
| `npm run reload`    | `obsidian plugin:reload id=clickup-integration`                              |
| `npm version patch` | Bumps the version in `package.json`, `manifest.json` and `versions.json` |

## Project layout

```
src/main.ts                  plugin lifecycle (onload/onunload) and command registration
scripts/link-test-vault.mjs  links the build output into the test vault
test-vault/                  disposable vault for development
docs/clickup-api.md          notes on the ClickUp API
esbuild.config.mjs           bundling (TypeScript → main.js)
eslint.config.mts            linting with eslint-plugin-obsidianmd
tsconfig.json                TypeScript options (strict mode)
version-bump.mjs             keeps package.json and manifest.json versions in sync
```

Based on the official [obsidian-sample-plugin](https://github.com/obsidianmd/obsidian-sample-plugin) (August 2026 version).

## Manual installation

Run `npm run build`, then copy `main.js`, `manifest.json` and `styles.css` to
`<your vault>/.obsidian/plugins/clickup-integration/` and enable the plugin.

## Security

- The ClickUp token is kept in Obsidian's secret storage (the OS keychain), **never** in `data.json` or in the repository.
- `data.json` is git-ignored.
- All network calls go through Obsidian's `requestUrl` and only to `api.clickup.com`.

## Roadmap

1. [X] Explore the API with `curl` ([notes](docs/clickup-api.md))
2. [ ] Minimal plugin: an "Update ClickUp" command that writes `ClickUp.md`
3. [ ] Settings: token (secret), workspace, filters, refresh interval
4. [ ] Write-back: change status and open the card from Obsidian
5. [ ] Optional: a dedicated view or Task Board integration
