// Cria links simbólicos dos artefatos do build dentro do vault de teste,
// para o Obsidian carregar o plugin direto da pasta do repositório.
import { mkdirSync, symlinkSync, rmSync, lstatSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pluginDir = join(root, 'test-vault', '.obsidian', 'plugins', 'clickup-integration');
mkdirSync(pluginDir, { recursive: true });

for (const file of ['main.js', 'manifest.json', 'styles.css']) {
	const target = join(root, file);
	const link = join(pluginDir, file);
	try {
		if (lstatSync(link)) rmSync(link);
	} catch {
		/* link ainda não existe */
	}
	if (file === 'main.js' && !existsSync(target)) writeFileSync(target, '');
	symlinkSync(relative(pluginDir, target), link);
}
console.log(`links criados em ${relative(root, pluginDir)}`);
