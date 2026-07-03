# Antigravity Learning MCP Server

> Adaptive Learning Layer para AG-KIT 2.0 — O sistema que faz o Antigravity aprender com o usuário.

---

## O que é

O Antigravity Learning MCP é um servidor [Model Context Protocol (MCP)](https://modelcontextprotocol.io) que fornece uma camada de aprendizado adaptativo para o AG-KIT 2.0. Ele permite que agentes de IA:

1. **Salvem** preferências persistentes do usuário.
2. **Consultem** memórias antes de executar tarefas.
3. **Classifiquem** instruções como aprendizado ou pedido pontual.
4. **Detectem** conflitos entre regras novas e antigas.
5. **Promovam** memórias consolidadas para Skills reutilizáveis.
6. **Exportem/importem** memórias para backup e migração.

---

## Arquitetura

```
┌─────────────────────────────────────────────┐
│              AG-KIT 2.0 (IDE)               │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │  Agent   │  │  Skills  │  │ Workflows │  │
│  └────┬─────┘  └────┬─────┘  └─────┬─────┘  │
│       │             │              │        │
│       └─────────────┼──────────────┘        │
│                     │                       │
│              ┌──────▼───────┐               │
│              │  MCP Client  │               │
│              └──────┬───────┘               │
└─────────────────────┼───────────────────────┘
                      │ stdio
              ┌───────▼────────┐
              │  MCP Server    │
              │  (this server) │
              └───────┬────────┘
                      │
        ┌─────────────┼──────────────┐
        │             │              │
   ┌────▼───┐   ┌────▼────┐   ┌─────▼─────┐
   │  YAML  │   │  JSONL  │   │ Generated │
   │ Memory │   │  Events │   │   Skills  │
   └────────┘   └─────────┘   └───────────┘
```

### Três Camadas

| Camada | Função | Local |
|--------|--------|-------|
| **Skills** | Comportamentos estáveis e consolidados | `.agents/skills/` |
| **Workflows** | Processos automatizados de consulta/salvamento | `.agents/workflows/` |
| **MCP Server** | Lógica dinâmica de CRUD, busca e classificação | `.agents/mcp/antigravity-learning-mcp/` |

---

## Setup

### 1. Instalar dependências

```bash
cd .agents/mcp/antigravity-learning-mcp
npm install
```

### 2. Build

```bash
npm run build
```

### 3. Configurar MCP Client

Adicione ao arquivo de configuração do seu MCP client (ex: `settings.json` ou `mcp_config.json`):

```json
{
  "mcpServers": {
    "antigravity-learning-mcp": {
      "command": "node",
      "args": ["<caminho-absoluto>/.agents/mcp/antigravity-learning-mcp/dist/index.js"]
    }
  }
}
```

---

## Tools Disponíveis

### `save_learning`
Salva uma nova memória/aprendizado.

```json
{
  "category": "frontend",
  "scope": "global",
  "rule": "Evitar alert(), usar modais customizados.",
  "tags": ["frontend", "ui", "modal"],
  "confidence": 0.95
}
```

### `search_learning`
Busca memórias relevantes para uma tarefa.

```json
{
  "query": "dashboard financeiro login",
  "category": "frontend",
  "limit": 10
}
```

### `list_learnings`
Lista memórias com filtros opcionais.

```json
{
  "category": "frontend",
  "status": "active"
}
```

### `update_learning`
Atualiza uma memória pelo ID.

```json
{
  "id": "learn_000001",
  "updates": { "confidence": 0.99 }
}
```

### `delete_learning`
Soft-delete (padrão) ou hard-delete.

```json
{
  "id": "learn_000001",
  "hardDelete": false
}
```

### `detect_conflicts`
Verifica se nova regra conflita com existentes.

```json
{
  "rule": "Usar PostgreSQL como banco padrão.",
  "category": "database"
}
```

### `promote_to_skill`
Gera uma Skill a partir de memórias consolidadas.

```json
{
  "skillName": "user-database-preferences",
  "categories": ["database", "backend"]
}
```

### `classify_instruction`
Classifica se uma instrução deve virar memória.

```json
{
  "userMessage": "Não use alert, use modal customizado."
}
```

### `summarize_memory`
Resumo estatístico das memórias.

```json
{
  "category": "frontend",
  "maxItems": 5
}
```

### `export_memory` / `import_memory`
Backup e restauração de memórias.

---

## Memórias

### Onde ficam

```
.agents/memory/
├── preferences.yml      # Preferências gerais
├── corrections.yml      # Correções explícitas
├── stacks.yml           # Padrões técnicos
├── design-patterns.yml  # Padrões visuais
├── project-rules.yml    # Regras de projeto
├── workflows.yml        # Preferências de workflow
├── ignored-patterns.yml # Padrões a não aprender
└── rules-index.yml      # Índice rápido
```

### Formato de uma memória

```yaml
- id: "learn_000001"
  category: "frontend"
  scope: "global"
  rule: "Evitar alert(), confirm() e prompt(); usar modais customizados."
  source: "correção explícita do usuário"
  confidence: 0.95
  status: "active"
  created_at: "2026-07-01T15:30:00-03:00"
  updated_at: "2026-07-01T15:30:00-03:00"
  tags: [frontend, ui, modal]
  applies_to: [react, dashboard, forms]
```

### Editar manualmente

Os arquivos YAML são editáveis por humanos. Abra qualquer arquivo em `.agents/memory/` e modifique diretamente.

### Criar nova memória manualmente

Adicione ao arquivo YAML correto seguindo o formato acima. Use um ID único e preencha todos os campos obrigatórios.

---

## Conflitos

### Prioridade de resolução

```
1. Instrução atual do usuário     ← SEMPRE VENCE
2. Regras do projeto atual
3. Memórias persistentes
4. Skills consolidadas
5. Boas práticas gerais
```

### Resolver conflitos

1. Use `detect_conflicts` para identificar.
2. A instrução atual do usuário sempre tem prioridade.
3. Marque memórias antigas como `deprecated` se necessário.
4. Conflitos são registrados no log `events.jsonl`.

---

## Backup

### Exportar

```json
// Via MCP tool
{ "tool": "export_memory" }
// Arquivo salvo em data/memory-export-<timestamp>.json
```

### Importar

```json
// Via MCP tool
{ "tool": "import_memory", "filePath": "data/memory-export-123.json" }
```

### Via Git

Os arquivos YAML são versionáveis com Git. Basta commitar `.agents/memory/`.

---

## Logs

Eventos são registrados em `data/events.jsonl`:

```jsonl
{"type":"learning_saved","id":"learn_000001","timestamp":"2026-07-01T15:30:00Z","category":"frontend","rule":"Evitar alert(); usar modal customizado."}
{"type":"conflict_detected","id":"learn_000002","timestamp":"2026-07-01T15:31:00Z","category":"database"}
```

---

## Migração Futura

A arquitetura está preparada para:

| Destino | Como |
|---------|------|
| **SQLite** | Substituir `yamlStore.ts` por `sqliteStore.ts` mantendo a interface |
| **Embeddings** | Adicionar embedding generation no `saveLearning` e vector search no `relevanceSearch` |
| **Busca semântica** | Substituir keyword scoring por cosine similarity em `relevanceSearch.ts` |
| **Interface web** | Criar HTTP endpoint em `server.ts` além do stdio |
| **Multi-projeto** | Usar `scope: project` com identificador de projeto |

---

## Testes

### Teste manual de classificação

```
Input: "Não use alert, use modal customizado."
Esperado:
  shouldSave: true
  category: frontend
  scope: global
  confidence: >= 0.85
```

### Teste manual de conflito

```
Input: "Usar PostgreSQL como banco padrão."
Existente: "Usar MySQL como banco padrão."
Esperado:
  hasConflict: true
  conflicts[0].reason: contém "MySQL"
```

### Teste manual de promoção

```
Input: skillName: "user-frontend-rules", categories: ["frontend"]
Esperado:
  success: true
  path: contém "SKILL.md"
  rulesIncluded: > 0
```
