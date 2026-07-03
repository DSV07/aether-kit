import type { LearningCategory, LearningScope, LearningStatus } from '../types/learning.js';
export declare function normalizeCategory(input: string): LearningCategory;
export declare function normalizeScope(input: string): LearningScope;
export declare function normalizeStatus(input: string): LearningStatus;
export declare function normalizeRule(rule: string): string;
export declare function normalizeAppliesTo(items: string[] | undefined): string[];
export declare function normalizeConfidence(value: number | undefined): number;
//# sourceMappingURL=memoryNormalizer.d.ts.map