import { Notice, Plugin } from 'obsidian';
import { ClickUpSettingsTab, DEFAULT_SETTINGS, type ClickUpSettings } from './settings';

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
			// TODO: fetch tasks from ClickUp
		} catch (error) {
			new Notice(`ClickUp: update failed (${error instanceof Error ? error.message : String(error)})`);
		}
	}
}
