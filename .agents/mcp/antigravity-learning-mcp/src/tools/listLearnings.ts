import type { LearningEntry, LearningCategory, LearningScope, LearningStatus } from '../types/learning.js';
import { getAllEntries } from '../storage/memoryStore.js';
import { normalizeCategory, normalizeScope, normalizeStatus } from '../services/memoryNormalizer.js';

export interface ListLearningsInput {
  category?: string;
  status?: string;
  scope?: string;
}

export function handleListLearnings(input: ListLearningsInput): {
  entries: LearningEntry[];
  total: number;
  filters: {
    category?: string;
    status?: string;
    scope?: string;
  };
} {
  let entries = getAllEntries();

  const filters: Record<string, string | undefined> = {};

  if (input.category) {
    const cat = normalizeCategory(input.category);
    entries = entries.filter(e => e.category === cat);
    filters.category = cat;
  }

  if (input.status) {
    const status = normalizeStatus(input.status);
    entries = entries.filter(e => e.status === status);
    filters.status = status;
  }

  if (input.scope) {
    const scope = normalizeScope(input.scope);
    entries = entries.filter(e => e.scope === scope);
    filters.scope = scope;
  }

  return {
    entries,
    total: entries.length,
    filters,
  };
}
