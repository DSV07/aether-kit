import type { ClassifyInstructionResult, LearningCategory, LearningScope } from '../types/learning.js';
import { normalizeCategory } from './memoryNormalizer.js';

const SAVE_INDICATORS: Array<{ pattern: RegExp; weight: number }> = [
  { pattern: /\bsempre\b/i, weight: 0.95 },
  { pattern: /\bnunca\b/i, weight: 0.95 },
  { pattern: /\bprefiro\b/i, weight: 0.90 },
  { pattern: /\beu gosto\b/i, weight: 0.85 },
  { pattern: /\beu não gosto\b/i, weight: 0.90 },
  { pattern: /\bda próxima vez\b/i, weight: 0.88 },
  { pattern: /\ba partir de agora\b/i, weight: 0.95 },
  { pattern: /\buse isso como padrão\b/i, weight: 0.95 },
  { pattern: /\bnão faça assim\b/i, weight: 0.90 },
  { pattern: /\bfaça desse jeito\b/i, weight: 0.88 },
  { pattern: /\besse é meu padrão\b/i, weight: 0.92 },
  { pattern: /\bmantenha esse estilo\b/i, weight: 0.90 },
  { pattern: /\bsalve isso\b/i, weight: 0.85 },
  { pattern: /\blembre disso\b/i, weight: 0.88 },
  { pattern: /\bconsidere isso nas próximas\b/i, weight: 0.88 },
  { pattern: /\balways\b/i, weight: 0.93 },
  { pattern: /\bnever\b/i, weight: 0.93 },
  { pattern: /\bprefer\b/i, weight: 0.88 },
  { pattern: /\bfrom now on\b/i, weight: 0.95 },
  { pattern: /\buse .+ as default\b/i, weight: 0.93 },
  { pattern: /\bdon'?t do .+ like that\b/i, weight: 0.88 },
  { pattern: /\bremember this\b/i, weight: 0.85 },
  { pattern: /\bkeep this style\b/i, weight: 0.90 },
];

const SKIP_INDICATORS: Array<{ pattern: RegExp; weight: number }> = [
  { pattern: /\bsó aqui\b/i, weight: 0.80 },
  { pattern: /\bsó nesse?\b/i, weight: 0.75 },
  { pattern: /\bsó dessa vez\b/i, weight: 0.85 },
  { pattern: /\bagora\b/i, weight: 0.30 },
  { pattern: /\bhoje\b/i, weight: 0.40 },
  { pattern: /\bnessa? página\b/i, weight: 0.70 },
  { pattern: /\bnessa? tela\b/i, weight: 0.70 },
  { pattern: /\besse? arquivo\b/i, weight: 0.60 },
  { pattern: /\bjust this once\b/i, weight: 0.85 },
  { pattern: /\bonly here\b/i, weight: 0.75 },
  { pattern: /\bfor now\b/i, weight: 0.50 },
];

const CATEGORY_KEYWORDS: Record<LearningCategory, string[]> = {
  frontend: ['react', 'vue', 'angular', 'css', 'html', 'componente', 'component', 'tela', 'página', 'ui', 'interface', 'modal', 'botão', 'button', 'form', 'formulário', 'layout', 'vite', 'next', 'tailwind'],
  backend: ['api', 'endpoint', 'controller', 'service', 'route', 'rota', 'middleware', 'express', 'node', 'servidor', 'server', 'rest', 'graphql'],
  database: ['banco', 'database', 'sql', 'mysql', 'postgres', 'mongodb', 'tabela', 'table', 'migration', 'schema', 'query', 'índice', 'index'],
  design: ['design', 'visual', 'estilo', 'cor', 'tipografia', 'fonte', 'espaçamento', 'aparência', 'identidade', 'branding', 'logo', 'tema', 'theme', 'dark mode'],
  security: ['segurança', 'security', 'auth', 'autenticação', 'token', 'jwt', 'senha', 'password', 'criptografia', 'https', 'cors', 'xss', 'csrf', '.env', 'segredo', 'secret'],
  deployment: ['deploy', 'docker', 'ci', 'cd', 'pipeline', 'hosting', 'servidor', 'nginx', 'vercel', 'netlify', 'aws', 'cloud'],
  documentation: ['documentação', 'readme', 'docs', 'comentário', 'jsdoc', 'swagger', 'openapi'],
  prompting: ['prompt', 'instrução', 'resposta', 'comunicação', 'tom', 'idioma', 'linguagem'],
  workflow: ['workflow', 'processo', 'fluxo', 'automação', 'script', 'pipeline'],
  architecture: ['arquitetura', 'structure', 'estrutura', 'pattern', 'padrão', 'módulo', 'camada', 'separação', 'monolito', 'microserviço', 'stack'],
  business: ['negócio', 'business', 'regra', 'cliente', 'produto', 'feature', 'requisito'],
  'code-style': ['estilo', 'lint', 'prettier', 'formatação', 'naming', 'convenção', 'variável', 'nomenclatura'],
  testing: ['teste', 'test', 'jest', 'vitest', 'playwright', 'cypress', 'unit', 'e2e', 'integration', 'mock', 'coverage'],
  performance: ['performance', 'desempenho', 'velocidade', 'cache', 'otimização', 'lazy', 'bundle', 'lighthouse'],
  'project-management': ['gestão', 'prazo', 'sprint', 'backlog', 'tarefa', 'task', 'milestone', 'prioridade'],
  general: [],
};

export function classifyInstruction(
  userMessage: string,
  context?: string
): ClassifyInstructionResult {
  const fullText = context ? `${userMessage} ${context}` : userMessage;
  const lowerText = fullText.toLowerCase();

  // Calculate save score
  let saveScore = 0;
  let matchedIndicators: string[] = [];

  for (const indicator of SAVE_INDICATORS) {
    if (indicator.pattern.test(fullText)) {
      saveScore = Math.max(saveScore, indicator.weight);
      matchedIndicators.push(indicator.pattern.source);
    }
  }

  // Calculate skip score
  let skipScore = 0;
  for (const indicator of SKIP_INDICATORS) {
    if (indicator.pattern.test(fullText)) {
      skipScore = Math.max(skipScore, indicator.weight);
    }
  }

  // Determine category
  let bestCategory: LearningCategory = 'general';
  let bestCategoryScore = 0;

  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let catScore = 0;
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        catScore += 1;
      }
    }
    if (catScore > bestCategoryScore) {
      bestCategoryScore = catScore;
      bestCategory = cat as LearningCategory;
    }
  }

  // Extract tags from keywords
  const detectedTags: string[] = [];
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword) && !detectedTags.includes(keyword)) {
        detectedTags.push(keyword);
      }
    }
  }

  // Determine scope
  let scope: LearningScope = 'global';
  if (/\bnesse? projeto\b/i.test(fullText) || /\bthis project\b/i.test(fullText)) {
    scope = 'project';
  } else if (/\bnessa? stack\b/i.test(fullText)) {
    scope = 'stack';
  } else if (/\btemporári/i.test(fullText) || /\bsó agora\b/i.test(fullText)) {
    scope = 'temporary';
  }

  const shouldSave = saveScore > skipScore && saveScore >= 0.70;
  const confidence = shouldSave ? saveScore : 1 - skipScore;

  // Build rule from message
  const rule = extractRule(userMessage);

  const reason = shouldSave
    ? `A frase contém indicador de preferência persistente (${matchedIndicators.slice(0, 2).join(', ')}).`
    : skipScore > 0
      ? 'A instrução parece ser pontual e específica para este contexto.'
      : 'Não foram detectados indicadores claros de preferência persistente.';

  return {
    shouldSave,
    reason,
    category: bestCategory,
    scope,
    rule,
    confidence: Math.round(confidence * 100) / 100,
    tags: detectedTags.slice(0, 10),
  };
}

function extractRule(message: string): string {
  let rule = message.trim();

  // Remove common prefixes
  rule = rule.replace(/^(por favor,?\s*|please,?\s*)/i, '');
  rule = rule.replace(/^(a partir de agora,?\s*|from now on,?\s*)/i, '');
  rule = rule.replace(/^(da próxima vez,?\s*|next time,?\s*)/i, '');
  rule = rule.replace(/^(sempre que\s*|whenever\s*)/i, '');

  if (!rule.endsWith('.')) rule += '.';
  rule = rule.charAt(0).toUpperCase() + rule.slice(1);

  return rule;
}
