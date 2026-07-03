# Resolve Memory Conflict

Use este workflow quando uma nova instrução conflitar com uma memória antiga.

## Objetivo

Resolver conflitos de forma segura sem interromper a tarefa principal e sem perder auditabilidade.

## Prioridade de Resolução

```
1. Instrução atual do usuário     ← SEMPRE VENCE
2. Regra específica do projeto
3. Memória global persistente
4. Skill consolidada
5. Boas práticas gerais
```

## Passos

1. **Identificar regras conflitantes** via `detect_conflicts`.
2. **Manter a instrução atual** como prioridade máxima.
3. **Avaliar a intenção do usuário:**
   - Se disse "a partir de agora" → atualizar memória antiga.
   - Se disse "dessa vez" → manter memória antiga intacta.
   - Se não ficou claro → seguir instrução atual e não alterar memória.
4. **Se necessário**, marcar memória antiga como `conflicting` ou `deprecated` via `update_learning`.
5. **Registrar evento** no log com detalhes do conflito.
6. **Não interromper** a tarefa principal por causa do conflito.

## Exemplo

**Memória ativa:** "Usar MySQL como banco padrão."
**Instrução do usuário:** "Dessa vez use PostgreSQL em vez de MySQL."

**Resolução:**
- Usar PostgreSQL nesta tarefa.
- Manter memória de MySQL ativa (não alterar).
- Não registrar conflito (é instrução pontual).

**Se o usuário dissesse:** "A partir de agora use PostgreSQL em vez de MySQL."

**Resolução:**
- Usar PostgreSQL nesta tarefa.
- Marcar memória de MySQL como `deprecated`.
- Criar nova memória para PostgreSQL.
- Registrar evento de conflito.

## Regras

- Nunca ignorar a instrução atual do usuário.
- Nunca interromper a tarefa para resolver conflito.
- Sempre registrar conflitos significativos no log.
- Na dúvida, seguir a instrução atual sem alterar memórias.
