import type { LearningCategory } from '../types/learning.js';
import type { MemorySearchResult } from '../types/memory.js';
import { searchLearnings } from '../services/relevanceSearch.js';
import { normalizeCategory } from '../services/memoryNormalizer.js';
import { normalizeTags } from '../utils/tags.js';

export interface SearchLearningInput {
  query: string;
  category?: string;
  scope?: string;
  tags?: string[];
  limit?: number;
}

export function handleSearchLearning(input: SearchLearningInput): {
  rules: MemorySearchResult[];
  total: number;
} {
  const options = {
    query: input.query,
    category: input.category ? normalizeCategory(input.category) : undefined,
    scope: input.scope,
    tags: input.tags ? normalizeTags(input.tags) : undefined,
    limit: input.limit ?? 20,
  };

  const results = searchLearnings(options);

  return {
    rules: results,
    total: results.length,
  };
}
