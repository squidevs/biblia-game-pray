# Drawer (Menu Lateral)

## Estrutura Geral
- **Fundo:** Sólido (ex: branco ou tema escuro), sombra no lado direito.
- **Menu:** Desliza da esquerda, ocupa 70-80% da largura da tela.
- **Overlay:** Fundo escurecido sobre o restante da tela.
- **Espaçamento:** Margens internas amplas, opções bem separadas.

## Opções do Menu
- Lista vertical, cada item com:
  - **Ícone grande** à esquerda (32-40px)
  - **Label** em fonte média/grande
  - **Opção “Sair”** em vermelho ou cor de alerta
- Ordem sugerida: Perfil, Configurações, Sobre, Termos, Políticas, Sair
- Feedback visual ao tocar (cor de fundo, leve aumento de escala)

## Interações
- Abre ao tocar em “Mais” na navbar
- Fecha ao deslizar para o lado ou tocar fora do menu
- Animação suave ao abrir/fechar

## Acessibilidade
- Ícones com texto alternativo
- Contraste alto
- Navegação por teclado e leitor de tela

## Exemplo de Hierarquia Visual

```
-----------------------------
|           | Perfil        |
|  [Ícone]  | Configurações |
|           | Sobre         |
|           | Termos        |
|           | Políticas     |
|           | Sair          |
-----------------------------
```