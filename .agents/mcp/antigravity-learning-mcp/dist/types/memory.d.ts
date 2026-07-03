import type { LearningEntry, LearningCategory, LearningScope, LearningStatus } from './learning.js';
export interface MemoryFileMap {
    preferences: {
        preferences: LearningEntry[];
    };
    corrections: {
        corrections: LearningEntry[];
    };
    stacks: {
        stacks: LearningEntry[];
    };
    'design-patterns': {
        design_patterns: LearningEntry[];
    };
    'project-rules': {
        project_rules: LearningEntry[];
    };
    workflows: {
        workflows: LearningEntry[];
    };
}
export type MemoryFileName = keyof MemoryFileMap;
export declare const MEMORY_FILE_KEYS: Record<MemoryFileName, string>;
export declare const CATEGORY_TO_FILE: Partial<Record<LearningCategory, MemoryFileName>>;
export interface MemoryQuery {
    query?: string;
    category?: LearningCategory;
    scope?: LearningScope;
    status?: LearningStatus;
    tags?: string[];
    limit?: number;
}
export interface MemorySearchResult {
    id: string;
    category: LearningCategory;
    rule: string;
    relevance: number;
    tags: string[];
    scope: LearningScope;
}
export interface RulesIndex {
    version: string;
    last_updated: string;
    total_rules: number;
    categories: string[];
    tags: string[];
    files: Array<{
        path: string;
        key: string;
        count: number;
    }>;
}
//# sourceMappingURL=memory.d.ts.map