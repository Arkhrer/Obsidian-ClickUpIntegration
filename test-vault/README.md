# Test vault

A disposable vault for developing the plugin. Open this folder in Obsidian with **Open folder as vault** and turn on community plugins.

`npm run dev` creates links in `.obsidian/plugins/clickup-integration/` pointing to `main.js`, `manifest.json` and `styles.css` at the repository root. After each build, `npm run reload` reloads the plugin (requires the Obsidian CLI).

Use a test token and workspace whenever possible. The generated `ClickUp.md` note is git-ignored, and so is everything Obsidian writes to `.obsidian/`.
