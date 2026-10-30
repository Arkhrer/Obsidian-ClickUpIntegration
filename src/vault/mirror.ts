import { normalizePath, TFolder, type App } from 'obsidian';

export async function writeMirrorNote(app: App, path: string, content: string): Promise<void> {
	const normalizedPath = normalizePath(path);

	const index = normalizedPath.lastIndexOf('/');
	if (index !== -1) {
		const directory = normalizedPath.slice(0, index);
		if (!app.vault.getFolderByPath(directory)) {
			await app.vault.createFolder(directory);
		}
	}

	if (app.vault.getAbstractFileByPath(normalizedPath) instanceof TFolder) {
		throw new Error('The path set in the plugin\'s settings is a folder.');
	}

	const file = app.vault.getFileByPath(normalizedPath);
	if (file) {
		await app.vault.process(file, () => content);
	} else {
		await app.vault.create(normalizedPath, content);
	}
}
