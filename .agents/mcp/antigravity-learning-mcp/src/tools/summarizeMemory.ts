import { getActiveEntries, getAllEntries } from '../storage/memoryStore.js';
import type { LearningCategory } from '../types/learning.js';
import { normalizeCategory } from '../services/memoryNormalizer.js';

export interface SummarizeInput {
  category?: string;
  maxItems?: number;
}

export function handleSummarizeMemory(input: SummarizeInput): {
  totalActive: number;
  totalAll: number;
  byCategory: Record<string, number>;
  byScope: Record<string, number>;
  byStatus: Record<string, number>;
  topRules: Array<{ id: string; category: string; rule: string; confidence: number }>;
} {
  const allEntries = getAllEntries();
  const activeEntries = getActiveEntries();

  let filteredActive = activeEntries;
  if (input.category) {
    const cat = normalizeCategory(input.category);
    filteredActive = filteredActive.filter(e => e.category === cat);
  }

  // Count by category
  const byCategory: Record<string, number> = {};
  for (const entry of allEntries) {
    byCategory[entry.category] = (byCategory[entry.category] || 0) + 1;
  }

  // Count by scope
  const byScope: Record<string, number> = {};
  for (const entry of allEntries) {
    byScope[entry.scope] = (byScope[entry.scope] || 0) + 1;
  }

  // Count by status
  const byStatus: Record<string, number> = {};
  for (const entry of allEntries) {
    byStatus[entry.status] = (byStatus[entry.status] || 0) + 1;
  }

  // Top rules by confidence
  const maxItems = input.maxItems ?? 10;
  const topRules = filteredActive
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, maxItems)
    .map(e => ({
      id: e.id,
      category: e.category,
      rule: e.rule,
      confidence: e.confidence,
    }));

  return {
    totalActive: activeEntries.length,
    totalAll: allEntries.length,
    byCategory,
    byScope,
    byStatus,
    topRules,
  };
}
