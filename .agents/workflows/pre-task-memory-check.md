# Pre Task Memory Check

Use este workflow antes de iniciar qualquer tarefa técnica, criativa ou estratégica.

## Objetivo

Consultar memórias relevantes do usuário antes de executar a tarefa para garantir alinhamento com preferências persistentes.

## Ativação

- **Automática:** Antes de qualquer tarefa que envolva código, design, arquitetura ou documentação.
- **Manual:** Quando quiser verificar preferências antes de responder.

## Passos

1. **Identifique o tipo da tarefa** (frontend, backend, database, design, etc.).
2. **Extraia palavras-chave** do pedido do usuário.
3. **Consulte** `search_learning` no MCP com as palavras-chave e categoria.
4. **Selecione** apenas regras relevantes (relevance > 0.50).
5. **Injete** as regras no contexto do agente executor.
6. **Se houver conflito** com a instrução atual, priorize a instrução atual.
7. **Execute** a tarefa considerando as preferências retornadas.

## Categorias Comuns

- frontend
- backend
- database
- design
- security
- deployment
- documentation
- prompting
- architecture
- workflow

## Exemplo

**Pedido:**
```
Crie um dashboard financeiro com login.
```

**Consulta MCP:**
```
search_learning({
  query: "dashboard financeiro login frontend backend database",
  limit: 10
})
```

**Regras aplicáveis encontradas:**
- Usar React + Vite + TypeScript.
- Usar Node.js + Express.
- Usar MySQL.
- Não usar dados mockados.
- Evitar alert; usar modais customizados.
- Evitar aparência genérica de IA.

## Regra de Ouro

> A instrução atual do usuário **sempre vence** qualquer memória. Se o usuário disser "use PostgreSQL", ignore a memória de MySQL para esta tarefa.
