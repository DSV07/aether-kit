---
name: adaptive-user-learning
description: "Use esta skill em todas as tarefas para adaptar o comportamento dos agentes às preferências persistentes, correções anteriores e padrões do usuário."
when_to_use: "Em TODAS as tarefas técnicas, criativas ou estratégicas. Consulte memórias ANTES de executar e avalie se correções do usuário devem virar memória DEPOIS de executar."
allowed-tools: Read, Grep, Glob
---

# Adaptive User Learning

> Camada de aprendizado adaptativo do AG-KIT 2.0. Torna o sistema progressivamente mais alinhado com o usuário.

## Objetivo

Adaptar respostas, código, arquitetura, design e decisões técnicas às preferências persistentes do usuário.

---

## Processo Obrigatório

### Antes da tarefa

1. Consultar memórias relevantes via `search_learning` no MCP.
2. Aplicar somente regras compatíveis com a tarefa atual.
3. Priorizar a instrução atual do usuário sobre qualquer memória.
4. Ignorar memórias com status `conflicting` ou `deprecated`.

### Durante a tarefa

5. Aplicar preferências de stack, design e code-style encontradas.
6. Se houver conflito entre memória e instrução atual, seguir a instrução atual.

### Após correções do usuário

7. Avaliar se a correção deve virar memória via `classify_instruction`.
8. Se `shouldSave === true`, salvar a preferência EXCLUSIVAMENTE utilizando a ferramenta MCP (`save_learning`). NUNCA escreva ou altere os arquivos YAML de memória manualmente.
9. Não salvar pedidos pontuais.

---

## Deve salvar como aprendizado

- Preferências reutilizáveis ("sempre use X", "nunca faça Y").
- Correções técnicas recorrentes.
- Padrões de stack (frameworks, banco, estrutura).
- Padrões visuais (design system, anti-AI look).
- Padrões de comunicação (idioma, tom, nível de detalhe).
- Regras de arquitetura (separação de camadas, naming).
- Regras de segurança (.env, secrets, validação).

## Não deve salvar

- Pedidos pontuais ("faça essa tela azul").
- Comentários momentâneos ("hoje estou sem tempo").
- Escolhas específicas de uma única tela ou arquivo.
- Informações sensíveis sem confirmação explícita.
- Instruções ambíguas sem clareza de persistência.

---

## Prioridade de Resolução

```
1. Instrução atual do usuário      ← SEMPRE VENCE
2. Regras específicas do projeto atual
3. Memórias persistentes do usuário
4. Skills consolidadas
5. Boas práticas gerais
6. Preferências padrão do agente
```

---

## Palavras-chave Indicadoras (salvar)

| Português | English |
|-----------|---------|
| sempre | always |
| nunca | never |
| prefiro | I prefer |
| eu gosto / eu não gosto | I like / I don't like |
| da próxima vez | next time |
| a partir de agora | from now on |
| use isso como padrão | use this as default |
| não faça assim | don't do it like that |
| mantenha esse estilo | keep this style |
| salve isso / lembre disso | save this / remember this |

---

## Ferramentas MCP

| Tool | Quando usar |
|------|-------------|
| `search_learning` | Antes de cada tarefa |
| `classify_instruction` | Quando o usuário corrigir algo |
| `save_learning` | Quando classificação indicar `shouldSave: true` |
| `detect_conflicts` | Antes de salvar, para evitar contradições |
| `summarize_memory` | Quando precisar de visão geral das memórias |
