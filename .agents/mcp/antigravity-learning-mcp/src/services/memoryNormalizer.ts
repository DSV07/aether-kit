import type { LearningCategory, LearningScope, LearningStatus } from '../types/learning.js';
import { LEARNING_CATEGORIES, LEARNING_SCOPES, LEARNING_STATUSES } from '../types/learning.js';
import { normalizeTags } from '../utils/tags.js';

export function normalizeCategory(input: string): LearningCategory {
  const lower = input.toLowerCase().trim().replace(/\s+/g, '-');
  if (LEARNING_CATEGORIES.includes(lower as LearningCategory)) {
    return lower as LearningCategory;
  }

  const aliases: Record<string, LearningCategory> = {
    'front-end': 'frontend',
    'front': 'frontend',
    'ui': 'frontend',
    'ux': 'design',
    'back-end': 'backend',
    'back': 'backend',
    'api': 'backend',
    'db': 'database',
    'banco': 'database',
    'sql': 'database',
    'infra': 'deployment',
    'infrastructure': 'deployment',
    'ci-cd': 'deployment',
    'cicd': 'deployment',
    'devops': 'deployment',
    'sec': 'security',
    'segurança': 'security',
    'docs': 'documentation',
    'doc': 'documentation',
    'arch': 'architecture',
    'arquitetura': 'architecture',
    'estilo': 'code-style',
    'style': 'code-style',
    'test': 'testing',
    'teste': 'testing',
    'perf': 'performance',
    'prompt': 'prompting',
    'negocio': 'business',
    'business-logic': 'business',
    'pm': 'project-management',
    'gestao': 'project-management',
  };

  return aliases[lower] ?? 'general';
}

export function normalizeScope(input: string): LearningScope {
  const lower = input.toLowerCase().trim();
  if (LEARNING_SCOPES.includes(lower as LearningScope)) {
    return lower as LearningScope;
  }
  return 'global';
}

export function normalizeStatus(input: string): LearningStatus {
  const lower = input.toLowerCase().trim();
  if (LEARNING_STATUSES.includes(lower as LearningStatus)) {
    return lower as LearningStatus;
  }
  return 'active';
}

export function normalizeRule(rule: string): string {
  let normalized = rule.trim();
  if (!normalized.endsWith('.')) {
    normalized += '.';
  }
  normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  return normalized;
}

export function normalizeAppliesTo(items: string[] | undefined): string[] {
  if (!items || items.length === 0) return ['all'];
  return items.map(i => i.toLowerCase().trim()).filter(i => i.length > 0);
}

export function normalizeConfidence(value: number | undefined): number {
  if (value === undefined) return 0.80;
  return Math.max(0, Math.min(1, value));
}
