# Promote Memory To Skill

Use este workflow quando um grupo de memórias da mesma categoria virar um padrão consolidado.

## Objetivo

Transformar conjuntos de memórias consolidadas em Skills reutilizáveis e organizadas.

## Critérios de Promoção

Promover para Skill quando:

- Existem **5 ou mais regras** relacionadas na mesma categoria.
- A regra é usada com frequência em múltiplas tarefas.
- A regra afeta vários agentes ou contextos.
- A regra define um comportamento estável.
- A regra representa um padrão importante do usuário.

## Passos

1. **Buscar memórias** por categoria via `list_learnings`.
2. **Avaliar quantidade:** se < 5 regras ativas, adiar promoção.
3. **Remover duplicatas** (regras com textos similares).
4. **Detectar conflitos internos** via `detect_conflicts`.
5. **Organizar regras** por subtema e prioridade.
6. **Gerar Skill** via `promote_to_skill` no MCP.
7. **Salvar** em `.agents/skills/` (ou `generated-skills/` para revisão).
8. **Registrar evento** no log.
9. **Informar o usuário** sobre a Skill criada.

## Estrutura da Skill Gerada

```
skill-name/
└── SKILL.md     # Frontmatter + regras organizadas
```

## Regras

- Não criar Skill para uma única regra fraca.
- Não criar Skill com regras conflitantes internas.
- Remover duplicatas antes de gerar.
- A Skill deve ter linguagem clara e direta.
- A instrução atual do usuário sempre vence a Skill.
