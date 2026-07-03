import { LEARNING_CATEGORIES, LEARNING_SCOPES, LEARNING_STATUSES } from '../types/learning.js';
export function normalizeCategory(input) {
    const lower = input.toLowerCase().trim().replace(/\s+/g, '-');
    if (LEARNING_CATEGORIES.includes(lower)) {
        return lower;
    }
    const aliases = {
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
export function normalizeScope(input) {
    const lower = input.toLowerCase().trim();
    if (LEARNING_SCOPES.includes(lower)) {
        return lower;
    }
    return 'global';
}
export function normalizeStatus(input) {
    const lower = input.toLowerCase().trim();
    if (LEARNING_STATUSES.includes(lower)) {
        return lower;
    }
    return 'active';
}
export function normalizeRule(rule) {
    let normalized = rule.trim();
    if (!normalized.endsWith('.')) {
        normalized += '.';
    }
    normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);
    return normalized;
}
export function normalizeAppliesTo(items) {
    if (!items || items.length === 0)
        return ['all'];
    return items.map(i => i.toLowerCase().trim()).filter(i => i.length > 0);
}
export function normalizeConfidence(value) {
    if (value === undefined)
        return 0.80;
    return Math.max(0, Math.min(1, value));
}
//# sourceMappingURL=memoryNormalizer.js.map