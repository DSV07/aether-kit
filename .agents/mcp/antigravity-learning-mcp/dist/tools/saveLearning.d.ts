import type { SaveLearningInput, LearningEntry } from '../types/learning.js';
export declare function handleSaveLearning(input: SaveLearningInput): {
    success: boolean;
    entry?: LearningEntry;
    conflicts?: Array<{
        id: string;
        rule: string;
        reason: string;
    }>;
    error?: string;
};
//# sourceMappingURL=saveLearning.d.ts.map