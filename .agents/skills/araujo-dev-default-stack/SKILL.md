---
name: araujo-dev-default-stack
description: "Use esta skill quando o usuário pedir criação de sistemas web, SaaS, dashboards, ERPs, landing pages, APIs ou automações."
when_to_use: "Quando criar sistemas web, aplicações fullstack, SaaS, dashboards, ERPs, APIs ou qualquer aplicação que exija frontend + backend + banco de dados."
allowed-tools: Read, Grep, Glob
---

# Stack Padrão do Usuário

> Padrões técnicos consolidados para projetos web.

---

## Frontend

- React
- Vite
- TypeScript
- Responsividade mobile
- Componentes reutilizáveis
- Design system próprio
- Modais customizados (nunca alert/confirm/prompt)

## Backend

- Node.js
- Express
- MySQL
- APIs REST organizadas
- Controllers, Services, Routes, Middlewares

## Estrutura Recomendada

```
projeto/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── config/
│   └── package.json
├── database/
│   └── migrations/
├── docs/
│   └── README.md
└── .env.example
```

## Regras

- Evitar dados mockados em sistemas reais.
- Criar `.env.example` com todas as variáveis (sem valores secretos).
- Criar README técnico nos projetos.
- Separar controllers, services, routes e middlewares.
- Pensar em deploy desde o início.
- Criar tratamento de erros centralizado.
- Criar validação de entrada em todos os endpoints.
- Não expor segredos no código-fonte.

## Quando NÃO usar

- Quando o usuário pedir explicitamente outra stack.
- Quando a instrução atual contradizer estas preferências (a instrução atual vence).
