# Navbar (Menu Inferior Fixo)

## Estrutura Geral
- **Fundo:** Sólido (ex: branco ou tema escuro), preenchendo toda a largura inferior.
- **Altura:** 56-64px
- **Sombra:** Sutil acima da navbar para destacar
- **Espaçamento:** Ícones bem espaçados, área de toque ampla

## Elementos
- **Ícones grandes:** 24-32px, label abaixo (fonte pequena)
- **Ícone ativo:** Cor de destaque, label em negrito
- **Feedback visual:** Ao tocar, efeito de destaque (cor de fundo, leve aumento de escala)
- **Sempre visível:** Mesmo ao rolar a tela

## Opções
- Início (🏠): estatísticas rápidas, progresso, conquistas recentes
- Missões (🗺️): lista de missões, botão de iniciar/concluir
- Inventário (🎒): grid/lista de itens, filtro por tipo
- Estudos (📖): lista de estudos, progresso
- Conquistas (🏆): lista, progresso
- Mais (☰): abre drawer lateral

## Microinterações e Acessibilidade
- Animação suave ao trocar de aba
- Ícones com texto alternativo
- Contraste alto
- Navegação por teclado e leitor de tela

## Exemplo de Hierarquia Visual

```
-------------------------------------------------
| 🏠  🗺️  🎒  📖  🏆  ☰ |
| Início Missões Inventário Estudos Conquistas Mais |
-------------------------------------------------
```