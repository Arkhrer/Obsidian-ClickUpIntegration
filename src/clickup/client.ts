import { requestUrl } from 'obsidian';

const API_BASE = 'https://api.clickup.com/api/v2';

export interface ClickUpUser {
	id: number;
	username: string;
	email: string;
}

export class ClickUpApiError extends Error {
	constructor(readonly status: number, message: string) {
		super(message);
		this.name = 'ClickUpApiError';
	}
}

function describeStatus(status: number): string {
	if (status >= 500) return `ClickUp is having problems (HTTP ${status}). Try again later.`;
	switch (status) {
		case 401:
			return 'ClickUp rejected the token. Check it in the plugin settings.';
		case 429:
			return 'ClickUp rate limit reached. Try again in a minute.';
		default:
			return `Request failed (HTTP ${status}).`;
	}
}

export class ClickUpClient {
	constructor(private readonly token: string) {}

	private async get<T>(path: string): Promise<T> {
		const response = await requestUrl({
			url: `${API_BASE}${path}`,
			headers: { Authorization: this.token },
			throw: false,
		});
		if (response.status >= 400) {
			throw new ClickUpApiError(response.status, describeStatus(response.status));
		}
		return response.json as T;
	}

	async getUser(): Promise<ClickUpUser> {
		const body = await this.get<{ user: ClickUpUser }>('/user');
		return body.user;
	}
}
