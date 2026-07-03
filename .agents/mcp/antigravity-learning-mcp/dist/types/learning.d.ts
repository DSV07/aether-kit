export declare const LEARNING_CATEGORIES: readonly ["frontend", "backend", "database", "design", "security", "deployment", "documentation", "prompting", "workflow", "architecture", "business", "code-style", "testing", "performance", "project-management", "general"];
export type LearningCategory = typeof LEARNING_CATEGORIES[number];
export declare const LEARNING_SCOPES: readonly ["global", "project", "stack", "agent", "workflow", "file", "temporary"];
export type LearningScope = typeof LEARNING_SCOPES[number];
export declare const LEARNING_STATUSES: readonly ["active", "inactive", "deprecated", "conflicting", "pending-review"];
export type LearningStatus = typeof LEARNING_STATUSES[number];
export interface LearningExamples {
    bad?: string[];
    good?: string[];
}
export interface LearningEntry {
    id: string;
    category: LearningCategory;
    scope: LearningScope;
    rule: string;
    source: string;
    confidence: number;
    status: LearningStatus;
    created_at: string;
    updated_at: string;
    tags: string[];
    applies_to: string[];
    examples?: LearningExamples;
}
export interface SaveLearningInput {
    category: string;
    scope: string;
    rule: string;
    source?: string;
    confidence?: number;
    tags?: string[];
    applies_to?: string[];
    examples?: LearningExamples;
}
export interface UpdateLearningInput {
    id: string;
    updates: {
        rule?: string;
        category?: string;
        scope?: string;
        status?: string;
        confidence?: number;
        tags?: string[];
        applies_to?: string[];
    };
}
export interface DeleteLearningInput {
    id: string;
    hardDelete?: boolean;
}
export interface ClassifyInstructionInput {
    userMessage: string;
    context?: string;
}
export interface ClassifyInstructionResult {
    shouldSave: boolean;
    reason: string;
    category: LearningCategory;
    scope: LearningScope;
    rule: string;
    confidence: number;
    tags: string[];
}
//# sourceMappingURL=learning.d.ts.map