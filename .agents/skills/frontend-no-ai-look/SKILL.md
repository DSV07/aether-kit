---
name: frontend-no-ai-look
description: "Use esta skill ao criar interfaces, landing pages, dashboards, sites institucionais e sistemas visuais para evitar aparência genérica de IA."
when_to_use: "Quando criar qualquer interface visual: landing pages, dashboards, sites, formulários, sistemas com UI. Especialmente importante em projetos voltados para clientes e usuários finais."
allowed-tools: Read, Grep, Glob
---

# Frontend sem Aparência Genérica de IA

> Interfaces que parecem feitas por designers humanos, não por templates de IA.

---

## Regras Visuais

- Evitar layout genérico com hero + 3 cards + footer.
- Evitar seções repetitivas e simétricas sem propósito.
- Evitar cards iguais sem diferenciação visual.
- Evitar gradientes genéricos demais (especialmente azul-roxo padrão).
- Evitar excesso de azul genérico sem identidade.
- Criar identidade visual clara e consistente.
- Criar hierarquia visual forte (títulos, subtítulos, corpo).
- Usar espaçamentos consistentes e generosos.
- Criar componentes com personalidade própria.
- Priorizar aparência profissional, realista e premium.
- Usar tipografia com intenção (não Arial/Helvetica genérico).
- Criar micro-interações e animações sutis.
- Garantir contraste adequado para acessibilidade.

## Componentes

- Não usar `alert()`, `confirm()` ou `prompt()` nativos.
- Usar modais customizados para confirmações e alertas.
- Usar toasts para notificações rápidas.
- Usar drawers para painéis laterais.
- Criar feedback visual customizado para ações do usuário.
- Criar componentes reutilizáveis com props bem definidos.
- Manter responsividade mobile em todos os componentes.

## Anti-Patterns a Evitar

| ❌ Não faça | ✅ Faça |
|------------|---------|
| 3 cards iguais lado a lado | Cards com tamanhos e layouts variados |
| Gradiente azul-roxo genérico | Paleta de cores com identidade |
| Seções repetitivas | Variar layouts entre seções |
| Hero com imagem stock | Hero com design customizado |
| `alert('Sucesso!')` | Modal/toast customizado |
| Fontes padrão do browser | Tipografia escolhida com intenção |
