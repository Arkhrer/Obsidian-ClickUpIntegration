export interface ClickUpStatus {
	status: string;
	type: string;
	color: string;
	orderindex: number;
}

export interface ClickUpTask {
	id: string;
	name: string;
	url: string;
	status: ClickUpStatus;
	priority: { priority: string } | null;
	due_date: string | null;
	date_updated: string;
	list: { id: string; name: string };
}

export interface ClickUpTeam {
	id: string;
	name: string;
}
