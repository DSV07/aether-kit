export interface ConflictEntry {
    id: string;
    rule: string;
    reason: string;
    category: string;
    confidence: number;
}
export interface ConflictResult {
    hasConflict: boolean;
    conflicts: ConflictEntry[];
}
export interface ConflictDetectionInput {
    rule: string;
    category?: string;
    scope?: string;
}
export type ConflictResolution = 'keep-new' | 'keep-old' | 'mark-conflicting' | 'deprecate-old';
//# sourceMappingURL=conflict.d.ts.map