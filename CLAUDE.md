# Contexto para o Claude

Plugin pessoal do Obsidian (TypeScript) que integra as tarefas do ClickUp do Arkhrer ao vault de **trabalho** (`~/Documentos/Obsidian/Trabalho`). Não é publicado.

## Como trabalhar neste repositório

- **Modo aprendizado.** O Arkhrer está aprendendo TypeScript e a API do Obsidian (vem de C/C++ e Python). Construa o código **junto com ele, passo a passo**, explicando cada conceito, em vez de entregar arquivos inteiros prontos. Etapas pequenas, uma ideia por vez.
- Responda em português do Brasil.
- Siga o roteiro do `README.md` e atualize as caixas quando uma etapa terminar.
- Anotações sobre a API do ClickUp ficam em `docs/api-clickup.md`; atualize quando descobrir algo novo.

## Regras técnicas

- Estrutura: `src/main.ts` só cuida do ciclo de vida e do registro de comandos. Lógica em módulos (`src/clickup/`, `src/render/`, `src/settings.ts` etc.).
- Rede só via `requestUrl` do `obsidian` (funciona no celular e não esbarra em CORS). Nada de `fetch`.
- Token só em `app.secretStorage` (ID `clickup-token`). Nunca em `data.json`, log ou mensagem de erro.
- Escrita em arquivo via `app.vault.process` (atômico), não `read` + `modify`.
- Sem dependências de runtime além do `obsidian`, salvo necessidade clara.
- Antes de concluir uma mudança: `npm run typecheck` e `npm run lint`.

## Convenções do vault de destino

Propriedades em minúsculas e sem acento: `tipo`, `status`, `criado`, `atualizado`, `fonte`, `origem`, `projeto`, `clickup`. A nota gerada leva `origem: clickup`. Tarefas do vault usam o formato com emoji do plugin Tasks e a tag `#t`.
