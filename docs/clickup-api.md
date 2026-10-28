# ClickUp API notes

Explored with `curl` on 2026-10-28, before writing the plugin. Official reference: <https://developer.clickup.com/reference>.

## Authentication

- Personal token (`pk_…`), generated in ClickUp → Settings → Apps → API Token.
- Sent **as is** in the header, without `Bearer`: `Authorization: pk_…`.
- It grants access to everything the account can access. The plugin keeps it in Obsidian's `app.secretStorage` (since 1.11.4), never in `data.json`.

## Endpoints used so far

| Purpose | Method and path | Notes |
| --- | --- | --- |
| Authenticated user | `GET /api/v2/user` | `.user.id` |
| Workspaces | `GET /api/v2/team` | In API v2 a workspace is called a **team** |
| Tasks in a workspace | `GET /api/v2/team/{team_id}/task` | Filters in the query string; up to 100 per page |

Base URL: `https://api.clickup.com`.

### Query parameters of `/team/{team_id}/task`

- `assignees[]=<user_id>`: arrays are sent by repeating the parameter with `[]`.
- `page=0, 1, …`: the response has `last_page: true` on the last page.
- `subtasks=true`: **subtasks are excluded by default**. That is why `curl` returned 13 tasks while the ClickUp connector (which includes subtasks) showed 14.
- `include_closed=true`: closed tasks are excluded by default.
- Useful later: `statuses[]`, `list_ids[]`, `due_date_gt`, `due_date_lt`, `date_updated_gt` (incremental sync), `order_by`, `reverse`.

## Task shape (fields we care about)

| Field | JSON type | Example / note |
| --- | --- | --- |
| `id` | string | `"86bat51h9"` |
| `name` | string | Title |
| `text_content` | string | Plain-text description (`description` holds the same text) |
| `status.status` | string | `"back burner"`, `"in progress"`, `"under review"`, `"to do"` |
| `status.type` | string | `"open"`, `"custom"`, `"closed"`: the **type** is stable; the name varies per list |
| `status.color` | string | `"#f76808"` |
| `priority` | object or `null` | `.priority`: `"urgent"`, `"high"`, `"normal"`, `"low"` |
| `due_date`, `start_date` | string or `null` | **Milliseconds since epoch, as a string** (`"1792432353128"`) |
| `date_created`, `date_updated`, `date_closed` | string | Same format |
| `assignees[]` | objects | `id`, `username`, `email` |
| `tags[]` | objects | `name` |
| `parent` | string or `null` | Parent task ID for subtasks |
| `list` | object | `id`, `name` |
| `folder`, `project` | object | May come back as `name: "hidden"` when the list is not inside a visible folder |
| `url` | string | Card link |

## Gotchas

- Dates are **strings** holding milliseconds, not numbers or ISO dates. Convert with `new Date(Number(x))`.
- `priority` can be `null`.
- Status names are free text per list; to map them to `[ ]` / `[/]` / `[x]`, rely on `status.type` first and fall back to the name only for special cases.
- Pagination: keep requesting until `last_page === true`.
