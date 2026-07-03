import type { LearningCategory } from '../types/learning.js';
import type { MemorySearchResult } from '../types/memory.js';
export interface SearchOptions {
    query?: string;
    category?: LearningCategory;
    scope?: string;
    tags?: string[];
    limit?: number;
    includeInactive?: boolean;
}
export declare function searchLearnings(options: SearchOptions): MemorySearchResult[];
//# sourceMappingURL=relevanceSearch.d.ts.map