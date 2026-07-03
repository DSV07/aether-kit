---
name: skill-generator
description: "Use esta skill quando for necessário transformar memórias consolidadas em uma nova Skill."
when_to_use: "Quando existem 5+ regras relacionadas na mesma categoria, quando o usuário pedir para criar uma Skill, ou quando o workflow promote-memory-to-skill for ativado."
allowed-tools: Read, Write, Grep, Glob
---

# Skill Generator

> Meta-skill para gerar novas Skills a partir de memórias persistentes consolidadas.

---

## Objetivo

Gerar Skills limpas, úteis e não contraditórias a partir de memórias persistentes.

## Critérios de Promoção

Promover para Skill quando:

- Existem **5 ou mais regras** relacionadas na mesma categoria.
- A regra é usada com frequência em múltiplas tarefas.
- A regra afeta vários agentes/contextos.
- A regra define um comportamento estável do usuário.
- A regra representa um padrão importante consolidado.

## Critérios de NÃO Promoção

- Uma única regra fraca não justifica uma Skill.
- Regras conflitantes entre si não devem virar Skill.
- Regras temporárias ou de escopo `file` não devem ser promovidas.
- Regras com `confidence < 0.70` devem ser revisadas antes da promoção.

## Estrutura Obrigatória

Toda Skill gerada deve conter:

```markdown
---
name: nome-da-skill
description: "Descrição clara e objetiva."
when_to_use: "Condições de ativação."
allowed-tools: Read, Grep, Glob
---

# Título da Skill

## Objetivo
[Por que essa Skill existe]

## Quando usar
[Lista de situações de ativação]

## Quando NÃO usar
[Lista de situações onde não aplicar]

## Regras
[Lista de regras organizadas por subtema]

## Exemplos (se aplicável)
[Exemplos de bom e mau uso]

## Prioridade
A instrução atual do usuário sempre vence estas regras.

## Restrições
[Limitações e exceções]
```

## Ferramentas

- Use `promote_to_skill` do MCP para automação.
- Skills geradas são salvas em `.agents/mcp/antigravity-learning-mcp/generated-skills/` por padrão.
- Para Skills que devem ser ativas imediatamente, copie para `.agents/skills/`.

## Regras

- Não criar Skill para uma única regra fraca.
- Não criar Skill com regras conflitantes internas.
- Remover duplicatas antes de gerar.
- Manter linguagem clara e direta.
- A Skill deve ser útil para agentes futuros.
- Registrar evento no log ao criar uma Skill.
