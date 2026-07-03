---
name: backend-real-data
description: "Use esta skill ao criar backends, APIs, dashboards, ERPs, SaaS e sistemas com dados persistentes."
when_to_use: "Quando criar backend de sistemas funcionais que conectam a banco de dados real. NÃO usar para protótipos rápidos ou MVPs onde o usuário pediu dados mockados explicitamente."
allowed-tools: Read, Grep, Glob
---

# Backend com Dados Reais

> Sistemas funcionais com persistência real, não protótipos com dados mockados.

---

## Regras

- Não usar dados mockados quando o usuário pedir sistema funcional.
- Criar conexão real com banco de dados.
- Usar MySQL como banco padrão (salvo instrução contrária do usuário).
- Criar scripts SQL ou migrations para setup do banco.
- Separar controllers, services, routes e middlewares.
- Criar tratamento de erros centralizado com mensagens claras.
- Criar validação de entrada em todos os endpoints.
- Criar logs básicos para debugging e auditoria.
- Não expor segredos no código-fonte.
- Criar `.env.example` com todas as variáveis necessárias.
- Documentar endpoints (mínimo: método, rota, parâmetros, resposta).

## Estrutura de Backend

```
backend/
├── src/
│   ├── controllers/    # Recebem request, delegam para services
│   ├── services/       # Lógica de negócio pura
│   ├── routes/         # Definição de rotas
│   ├── middlewares/    # Auth, validation, error handling
│   ├── models/         # Schemas, entities, tipos
│   ├── config/         # Database, environment, constants
│   └── utils/          # Helpers reutilizáveis
├── .env.example
├── package.json
└── README.md
```

## Quando NÃO usar

- Quando o usuário pedir explicitamente um protótipo com dados mockados.
- Quando a instrução atual contradizer estas regras.
