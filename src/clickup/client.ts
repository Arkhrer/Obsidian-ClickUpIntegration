import { requestUrl } from 'obsidian';

const API_BASE = 'https://api.clickup.com/api/v2';

export interface ClickUpUser {
	id: number;
	username: string;
	email: string;
}

export class ClickUpClient {
	constructor(private readonly token: string) {}

	async getUser(): Promise<ClickUpUser> {
		const response = await requestUrl({
			url: `${API_BASE}/user`,
			headers: { Authorization: this.token },
		});
		const body = response.json as { user: ClickUpUser };
		return body.user;
	}
}
