import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { handleSaveLearning } from './tools/saveLearning.js';
import { handleSearchLearning } from './tools/searchLearning.js';
import { handleListLearnings } from './tools/listLearnings.js';
import { handleUpdateLearning } from './tools/updateLearning.js';
import { handleDeleteLearning } from './tools/deleteLearning.js';
import { handleDetectConflicts } from './tools/detectConflicts.js';
import { handlePromoteToSkill } from './tools/promoteToSkill.js';
import { handleClassifyInstruction } from './tools/classifyInstruction.js';
import { handleSummarizeMemory } from './tools/summarizeMemory.js';
import { handleExportMemory } from './tools/exportMemory.js';
import { handleImportMemory } from './tools/importMemory.js';

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'antigravity-learning-mcp',
    version: '1.0.0',
  });

  // Tool: save_learning
  server.tool(
    'save_learning',
    'Salva uma nova memória/aprendizado do usuário. Use quando o usuário expressar uma preferência persistente, correção recorrente ou padrão técnico.',
    {
      category: z.string().describe('Categoria da memória (frontend, backend, design, etc.)'),
      scope: z.string().default('global').describe('Escopo: global, project, stack, agent, workflow, file, temporary'),
      rule: z.string().describe('A regra/preferência a ser salva'),
      source: z.string().optional().describe('Origem da memória (ex: correção do usuário)'),
      confidence: z.number().min(0).max(1).optional().describe('Confiança de 0 a 1'),
      tags: z.array(z.string()).optional().describe('Tags para categorização'),
      applies_to: z.array(z.string()).optional().describe('Contextos onde a regra se aplica'),
      examples: z.object({
        bad: z.array(z.string()).optional(),
        good: z.array(z.string()).optional(),
      }).optional().describe('Exemplos de bom e mau uso'),
    },
    async (params) => {
      const result = handleSaveLearning(params);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool: search_learning
  server.tool(
    'search_learning',
    'Busca memórias/aprendizados relevantes para uma tarefa. Use ANTES de iniciar qualquer tarefa para consultar preferências do usuário.',
    {
      query: z.string().describe('Texto de busca (palavras-chave da tarefa)'),
      category: z.string().optional().describe('Filtrar por categoria'),
      scope: z.string().optional().describe('Filtrar por escopo'),
      tags: z.array(z.string()).optional().describe('Filtrar por tags'),
      limit: z.number().optional().describe('Máximo de resultados (padrão: 20)'),
    },
    async (params) => {
      const result = handleSearchLearning(params);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool: list_learnings
  server.tool(
    'list_learnings',
    'Lista memórias/aprendizados existentes com filtros opcionais.',
    {
      category: z.string().optional().describe('Filtrar por categoria'),
      status: z.string().optional().describe('Filtrar por status (active, inactive, deprecated, conflicting, pending-review)'),
      scope: z.string().optional().describe('Filtrar por escopo'),
    },
    async (params) => {
      const result = handleListLearnings(params);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool: update_learning
  server.tool(
    'update_learning',
    'Atualiza uma memória/aprendizado existente pelo ID.',
    {
      id: z.string().describe('ID da memória a atualizar'),
      updates: z.object({
        rule: z.string().optional(),
        category: z.string().optional(),
        scope: z.string().optional(),
        status: z.string().optional(),
        confidence: z.number().optional(),
        tags: z.array(z.string()).optional(),
        applies_to: z.array(z.string()).optional(),
      }).describe('Campos a atualizar'),
    },
    async (params) => {
      const result = handleUpdateLearning(params);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool: delete_learning
  server.tool(
    'delete_learning',
    'Deleta (desativa) uma memória. Por padrão faz soft-delete (status → inactive). Use hardDelete=true para apagar permanentemente.',
    {
      id: z.string().describe('ID da memória a deletar'),
      hardDelete: z.boolean().optional().describe('Se true, apaga permanentemente'),
    },
    async (params) => {
      const result = handleDeleteLearning(params);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool: detect_conflicts
  server.tool(
    'detect_conflicts',
    'Detecta conflitos entre uma nova regra e memórias existentes.',
    {
      rule: z.string().describe('A regra nova a verificar'),
      category: z.string().optional().describe('Categoria para filtrar a verificação'),
      scope: z.string().optional().describe('Escopo para filtrar'),
    },
    async (params) => {
      const result = handleDetectConflicts(params);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool: promote_to_skill
  server.tool(
    'promote_to_skill',
    'Gera uma Skill (.md) a partir de memórias consolidadas de uma ou mais categorias.',
    {
      skillName: z.string().describe('Nome da Skill a gerar (kebab-case)'),
      categories: z.array(z.string()).describe('Categorias das memórias a incluir'),
      ruleIds: z.array(z.string()).optional().describe('IDs específicos de regras (opcional)'),
      outputPath: z.string().optional().describe('Caminho de saída (opcional)'),
    },
    async (params) => {
      const result = handlePromoteToSkill(params);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool: classify_instruction
  server.tool(
    'classify_instruction',
    'Classifica se uma instrução do usuário deve virar memória persistente. Analisa palavras-chave, reutilizabilidade e escopo.',
    {
      userMessage: z.string().describe('A mensagem do usuário a classificar'),
      context: z.string().optional().describe('Contexto adicional da conversa'),
    },
    async (params) => {
      const result = handleClassifyInstruction(params);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool: summarize_memory
  server.tool(
    'summarize_memory',
    'Gera um resumo estatístico das memórias ativas: total por categoria, escopo, status e top regras.',
    {
      category: z.string().optional().describe('Filtrar resumo por categoria'),
      maxItems: z.number().optional().describe('Máximo de top regras a retornar'),
    },
    async (params) => {
      const result = handleSummarizeMemory(params);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool: export_memory
  server.tool(
    'export_memory',
    'Exporta todas as memórias para um arquivo JSON para backup.',
    {
      outputPath: z.string().optional().describe('Caminho do arquivo de saída'),
    },
    async (params) => {
      const result = handleExportMemory(params);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool: import_memory
  server.tool(
    'import_memory',
    'Importa memórias de um arquivo JSON de backup.',
    {
      filePath: z.string().describe('Caminho do arquivo JSON a importar'),
      overwrite: z.boolean().optional().describe('Sobrescrever memórias existentes'),
    },
    async (params) => {
      const result = handleImportMemory(params);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  return server;
}
