# API do ClickUp: o que aprendemos

Exploração feita com `curl` em 28/10/2026, antes de escrever o plugin. Documentação oficial: <https://developer.clickup.com/reference>.

## Autenticação

- Token pessoal (`pk_…`), gerado em ClickUp → Settings → Apps → API Token.
- Vai **direto** no cabeçalho, sem `Bearer`: `Authorization: pk_…`.
- Dá acesso a tudo o que a conta acessa. No plugin, fica no `app.secretStorage` do Obsidian (desde 1.11.4), nunca no `data.json`.

## Endpoints usados até agora

| Para quê | Método e caminho | Observações |
| --- | --- | --- |
| Usuário autenticado | `GET /api/v2/user` | `.user.id` |
| Workspaces | `GET /api/v2/team` | Na API v2, workspace = **team** |
| Tarefas de um workspace | `GET /api/v2/team/{team_id}/task` | Filtros na query string; até 100 por página |

Base: `https://api.clickup.com`.

### Parâmetros de `/team/{team_id}/task`

- `assignees[]=<user_id>`: listas vão repetindo o parâmetro com `[]`.
- `page=0, 1, …`: a resposta traz `last_page: true` na última página.
- `subtasks=true`: **por padrão a API não traz subtarefas**. Foi por isso que o `curl` devolveu 13 tarefas e o conector do ClickUp (que inclui subtarefas) mostrou 14.
- `include_closed=true`: por padrão as fechadas ficam de fora.
- Outros úteis depois: `statuses[]`, `list_ids[]`, `due_date_gt`, `due_date_lt`, `date_updated_gt` (para sincronizar só o que mudou), `order_by`, `reverse`.

## Formato de uma tarefa (campos que interessam)

| Campo | Tipo no JSON | Exemplo / nota |
| --- | --- | --- |
| `id` | string | `"86bat51h9"` |
| `name` | string | Título |
| `text_content` | string | Descrição em texto puro (`description` vem igual) |
| `status.status` | string | `"back burner"`, `"in progress"`, `"under review"`, `"to do"` |
| `status.type` | string | `"open"`, `"custom"`, `"closed"`: o **tipo** é estável; o nome muda por lista |
| `status.color` | string | `"#f76808"` |
| `priority` | objeto ou `null` | `.priority`: `"urgent"`, `"high"`, `"normal"`, `"low"` |
| `due_date`, `start_date` | string ou `null` | **Epoch em milissegundos como string** (`"1792432353128"`) |
| `date_created`, `date_updated`, `date_closed` | string | Idem |
| `assignees[]` | objetos | `id`, `username`, `email` |
| `tags[]` | objetos | `name` |
| `parent` | string ou `null` | ID da tarefa-mãe, se for subtarefa |
| `list` | objeto | `id`, `name` |
| `folder`, `project` | objeto | Podem vir com `name: "hidden"` quando a lista não está numa pasta visível |
| `url` | string | Link do cartão |

## Pegadinhas já anotadas

- Datas são **strings** com milissegundos, não números nem ISO. Converter com `new Date(Number(x))`.
- `priority` pode ser `null`.
- O nome do status é texto livre de cada lista; para mapear para `[ ]`/`[/]`/`[x]` é melhor olhar `status.type` e cair no nome só para casos especiais.
- Paginação: repetir até `last_page === true`.
