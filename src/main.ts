import { Notice, Plugin } from 'obsidian';
import { ClickUpSettingsTab, DEFAULT_SETTINGS, type ClickUpSettings } from './settings';
import { ClickUpClient } from './clickup/client';
import { renderNote } from './render/note';

export default class ClickUpIntegrationPlugin extends Plugin {
	settings!: ClickUpSettings;

	async onload(): Promise<void> {
		await this.loadSettings();
		this.addSettingTab(new ClickUpSettingsTab(this.app, this));

		this.addCommand({
			id: 'update',
			name: 'Update ClickUp',
			callback: () => { void this.update() },
		});
		this.addRibbonIcon('refresh-cw', 'Update ClickUp', () => { void this.update() });
	}

	onunload(): void {
		// Nothing to clean up yet: everything registered through this.add*/register* is undone automatically.
	}

	async loadSettings(): Promise<void> {
		const saved = (await this.loadData()) as Partial<ClickUpSettings> | null;
		this.settings = { ...DEFAULT_SETTINGS, ...saved };
	}

	async update(): Promise<void> {
		new Notice('ClickUp: updating...');
		try {
			const token = this.app.secretStorage.getSecret(this.settings.tokenSecret);
			if (token === null) {
				throw new Error('Set your ClickUp API token in the plugin settings.');
			}
			const client = new ClickUpClient(token);
			const user = await client.getUser();
			const teams = await client.getTeams();
			const team = teams[0];
			if (!team) throw new Error('No ClickUp workspaces found for this token.');
			const tasks = await client.getTasks(team.id, user.id);
			console.log(renderNote(tasks));
			new Notice(`ClickUp: ${tasks.length} tasks found from ${team.name}.`);
		} catch (error) {
			new Notice(`ClickUp: update failed (${error instanceof Error ? error.message : String(error)})`);
		}
	}
}
