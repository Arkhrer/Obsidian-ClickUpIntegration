# ClickUp Integration (plugin pessoal do Obsidian)

Traz as tarefas do ClickUp atribuídas a mim para uma nota do vault de trabalho e, mais adiante, permite atualizá-las sem sair do Obsidian. Não é publicado na loja de plugins.

## Requisitos

- Node.js 20.11 ou mais novo, com npm
- Obsidian 1.11.4 ou mais novo (por causa do `app.secretStorage`)
- CLI do Obsidian registrado, para o `npm run reload` (opcional)

## Começar

```bash
npm install      # dependências de desenvolvimento
npm run dev      # cria os links no vault de teste e compila em modo watch
```

Abra `test-vault/` no Obsidian (**Abrir pasta como vault**), ative os plugins da comunidade e ligue o **ClickUp Integration**. Depois de mudar o código, com o `dev` rodando:

```bash
npm run reload   # recarrega o plugin no Obsidian aberto
```

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Links no vault de teste + build em modo watch, com sourcemap |
| `npm run build` | Checagem de tipos + build de produção (minificado) |
| `npm run typecheck` | Só a checagem de tipos |
| `npm run lint` | ESLint com as regras oficiais do Obsidian |
| `npm run link` | Recria os links do vault de teste |
| `npm run reload` | `obsidian plugin:reload id=clickup-integration` |
| `npm version patch` | Sobe a versão no `package.json`, `manifest.json` e `versions.json` |

## Estrutura

```
src/main.ts               ciclo de vida do plugin (onload/onunload)
scripts/link-test-vault.mjs  links do build para o vault de teste
test-vault/               vault descartável para desenvolvimento
docs/api-clickup.md       anotações sobre a API do ClickUp
esbuild.config.mjs        empacotamento (TypeScript → main.js)
eslint.config.mts         lint com eslint-plugin-obsidianmd
tsconfig.json             opções do TypeScript (modo strict)
CLAUDE.md                 contexto para sessões com o Claude
version-bump.mjs          sincroniza versão entre package.json e manifest.json
```

A base veio do [obsidian-sample-plugin](https://github.com/obsidianmd/obsidian-sample-plugin) oficial (versão de 02/08/2026).

## Instalar no vault de trabalho

Depois de `npm run build`, copiar `main.js`, `manifest.json` e `styles.css` para
`~/Documentos/Obsidian/Trabalho/.obsidian/plugins/clickup-integration/` e ativar o plugin.

## Segurança

- O token do ClickUp fica no armazenamento de segredos do Obsidian (chaveiro do sistema), **nunca** no `data.json` nem no repositório.
- `data.json` está no `.gitignore`.
- Toda chamada de rede passa pelo `requestUrl` do Obsidian e só vai para `api.clickup.com`.

## Roteiro

1. [x] Explorar a API com `curl` ([anotações](docs/api-clickup.md))
2. [ ] Plugin mínimo: comando "Atualizar ClickUp" que escreve `ClickUp.md`
3. [ ] Configurações: token (segredo), workspace, filtros, intervalo
4. [ ] Volta: mudar status e abrir o cartão a partir do Obsidian
5. [ ] Opcional: vista própria ou integração com o Task Board
