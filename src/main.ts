import { Notice, Plugin } from 'obsidian';

export default class ClickUpIntegrationPlugin extends Plugin {
	onload(): void {
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

	async update(): Promise<void> {
		new Notice('ClickUp: updating...');
		try {
			
		} catch (error) {
			new Notice(`ClickUp: update failed (${error instanceof Error ? error.message : String(error)})`);
		}
	}
}
