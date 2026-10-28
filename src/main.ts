import { Plugin } from 'obsidian';

export default class ClickUpIntegrationPlugin extends Plugin {
	onload(): void {
		// Próximo passo: registrar o comando "Atualizar ClickUp".
	}

	onunload(): void {
		// Nada a limpar por enquanto: o que for registrado com this.register*() é desfeito sozinho.
	}
}
