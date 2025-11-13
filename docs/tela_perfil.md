# Tela Perfil do Usuário

## Estrutura Geral
- **Fundo:** Cor sólida (ex: branco ou tema escuro), preenchendo toda a tela.
- **Header:** Fixo no topo, título “Perfil”, botão de voltar à esquerda.
- **Espaçamento:** Margens laterais de 16-20px, espaçamento vertical generoso entre seções.

## Dados do Usuário
- **Avatar grande:** Centralizado, com opção de editar (ícone de lápis ou botão “Editar Avatar”)
- **Nome do usuário:** Fonte grande, bold, centralizado
- **Email:** Fonte menor, cor secundária
- **Nível, XP e moedas:** Badges coloridos, barra de XP
- **Reputação:** Badge ou label destacado

## Estatísticas
- Blocos para:
  - Missões completas
  - Dias consecutivos
  - Conquistas desbloqueadas
  - Livros estudados
- Cada bloco: ícone, valor, label

## Preferências e Configurações
- Lista de opções:
  - Editar dados pessoais
  - Notificações (push/email)
  - Privacidade do perfil
  - Idioma
  - Tema (claro/escuro)
  - Acessibilidade (alto contraste, TTS, etc.)

## Botão de Sair
- Botão grande, cor de alerta, ao final da tela

## Microinterações e Acessibilidade
- Feedback visual ao editar avatar ou dados
- Texto alternativo para ícones
- Contraste alto
- Navegação por teclado e leitor de tela

## Exemplo de Hierarquia Visual

```
--------------------------------------
| < Voltar |        Perfil           |
--------------------------------------
|     [Avatar] (Editar)              |
| Nome do usuário                    |
| Email                              |
| [Nível] [XP] [Moedas] [Reputação]  |
--------------------------------------
| [Bloco] Missões completas          |
| [Bloco] Dias consecutivos          |
| [Bloco] Conquistas desbloqueadas   |
| [Bloco] Livros estudados           |
--------------------------------------
| [Opção] Editar dados pessoais      |
| [Opção] Notificações               |
| [Opção] Privacidade                |
| [Opção] Idioma                     |
| [Opção] Tema                       |
| [Opção] Acessibilidade             |
--------------------------------------
| [Botão] Sair                       |
--------------------------------------
```
