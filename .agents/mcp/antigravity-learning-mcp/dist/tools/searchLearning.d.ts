import type { MemorySearchResult } from '../types/memory.js';
export interface SearchLearningInput {
    query: string;
    category?: string;
    scope?: string;
    tags?: string[];
    limit?: number;
}
export declare function handleSearchLearning(input: SearchLearningInput): {
    rules: MemorySearchResult[];
    total: number;
};
//# sourceMappingURL=searchLearning.d.ts.map