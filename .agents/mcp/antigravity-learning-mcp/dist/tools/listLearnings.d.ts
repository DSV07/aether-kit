import type { LearningEntry } from '../types/learning.js';
export interface ListLearningsInput {
    category?: string;
    status?: string;
    scope?: string;
}
export declare function handleListLearnings(input: ListLearningsInput): {
    entries: LearningEntry[];
    total: number;
    filters: {
        category?: string;
        status?: string;
        scope?: string;
    };
};
//# sourceMappingURL=listLearnings.d.ts.map