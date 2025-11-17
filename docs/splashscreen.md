# Splash Screen – Bíblia GamePray

## Wireframe Visual

```
┌───────────────────────────────────────────────┐
│                                               │
│         [Logotipo Centralizado]               │
│                                               │
│   [Efeito de luz/halo ao redor do logo]       │
│                                               │
│   Bíblia GamePray                             │
│   Jogando e Crescendo no Espírito             │
│                                               │
│   [Botão Pular discreto no canto inferior]    │
│                                               │
└───────────────────────────────────────────────┘
```

## Descrição do Fluxo
- Ao abrir o app, a tela exibe o fundo sólido ou gradiente.
- O logotipo aparece centralizado com animação de fade-in e zoom suave.
- Efeito de luz/halo ao redor do logo, transmitindo espiritualidade.
- Slogan ou nome do projeto aparece abaixo do logo.
- O som de intro é tocado automaticamente, sincronizado com a animação.
- Partículas sutis (estrelas/luz) podem surgir ao redor do logo.
- Botão “Pular” discreto no canto inferior permite ignorar a splash.
- Após 2-4 segundos, transição suave para a tela inicial.

## Acessibilidade
- Texto alternativo para logotipo.
- Volume do som respeita configurações globais.
- Botão “Pular” acessível por teclado e leitor de tela.

## Observações Técnicas
- O som de intro deve estar em `assets/sounds/intro.mp3`.
- O logotipo deve estar em `assets/logotipos/logo.png`.
- Animações podem ser feitas com CSS/JS ou framework nativo.
- O tempo de exibição pode ser configurável.
