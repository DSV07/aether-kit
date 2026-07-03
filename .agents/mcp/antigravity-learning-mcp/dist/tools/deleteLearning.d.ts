import type { DeleteLearningInput } from '../types/learning.js';
export declare function handleDeleteLearning(input: DeleteLearningInput): {
    success: boolean;
    action: 'soft-delete' | 'hard-delete';
    error?: string;
};
//# sourceMappingURL=deleteLearning.d.ts.map