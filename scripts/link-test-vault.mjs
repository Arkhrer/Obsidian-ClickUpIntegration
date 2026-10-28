// Symlinks the build output into the test vault so Obsidian loads the plugin
// straight from the repository, and makes sure the plugin is enabled there.
import { existsSync, lstatSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const PLUGIN_ID = 'clickup-integration';
const root = resolve(import.meta.dirname, '..');
const configDir = join(root, 'test-vault', '.obsidian');
const pluginDir = join(configDir, 'plugins', PLUGIN_ID);
mkdirSync(pluginDir, { recursive: true });

for (const file of ['main.js', 'manifest.json', 'styles.css']) {
	const target = join(root, file);
	const link = join(pluginDir, file);
	try {
		if (lstatSync(link)) rmSync(link);
	} catch {
		// the link does not exist yet
	}
	if (file === 'main.js' && !existsSync(target)) writeFileSync(target, '');
	symlinkSync(relative(pluginDir, target), link);
}

const enabledPlugins = join(configDir, 'community-plugins.json');
if (!existsSync(enabledPlugins)) writeFileSync(enabledPlugins, JSON.stringify([PLUGIN_ID], null, '\t') + '\n');

console.log(`Links created in ${relative(root, pluginDir)}`);
