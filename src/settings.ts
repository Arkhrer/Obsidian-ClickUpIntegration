import { PluginSettingTab, SettingDefinitionItem } from 'obsidian';

export interface ClickUpSettings {
	tokenSecret: string;    // name of the secret in Obsidian's keychain, not the token itself
	notePath: string;       // where the mirror note is written
}

export const DEFAULT_SETTINGS: ClickUpSettings = {
	tokenSecret: '',
	notePath: 'ClickUp.md',
};

export class ClickUpSettingsTab extends PluginSettingTab {
	getSettingDefinitions(): SettingDefinitionItem[] {
		return [
			{
				name: 'API token',
				desc: 'Personal token from ClickUp → Settings → Apps, stored in Obsidian\'s keychain.',
				control: { type: 'secret', key: 'tokenSecret' },
			},
			{
				name: 'Mirror note',
				desc: 'Path of the note that receives your ClickUp tasks, relative to the vault root. It is rewritten on every update.',
				control: { type: 'text', key: 'notePath' },
			},
		];
	}
}
