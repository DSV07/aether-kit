import type { UpdateLearningInput, LearningEntry } from '../types/learning.js';
import { updateEntry, findEntryById } from '../storage/memoryStore.js';
import { normalizeCategory, normalizeScope, normalizeStatus, normalizeRule, normalizeConfidence } from '../services/memoryNormalizer.js';
import { normalizeTags } from '../utils/tags.js';
import { nowISO } from '../utils/dates.js';
import { logEvent } from '../storage/jsonlLogger.js';

export function handleUpdateLearning(input: UpdateLearningInput): {
  success: boolean;
  entry?: LearningEntry;
  error?: string;
} {
  if (!input.id) {
    return { success: false, error: 'O campo "id" é obrigatório.' };
  }

  const existing = findEntryById(input.id);
  if (!existing) {
    return { success: false, error: `Memória com id "${input.id}" não encontrada.` };
  }

  const result = updateEntry(input.id, (entry) => {
    const updated = { ...entry };

    if (input.updates.rule !== undefined) {
      updated.rule = normalizeRule(input.updates.rule);
    }
    if (input.updates.category !== undefined) {
      updated.category = normalizeCategory(input.updates.category);
    }
    if (input.updates.scope !== undefined) {
      updated.scope = normalizeScope(input.updates.scope);
    }
    if (input.updates.status !== undefined) {
      updated.status = normalizeStatus(input.updates.status);
    }
    if (input.updates.confidence !== undefined) {
      updated.confidence = normalizeConfidence(input.updates.confidence);
    }
    if (input.updates.tags !== undefined) {
      updated.tags = normalizeTags(input.updates.tags);
    }
    if (input.updates.applies_to !== undefined) {
      updated.applies_to = input.updates.applies_to;
    }

    updated.updated_at = nowISO();
    return updated;
  });

  if (!result) {
    return { success: false, error: 'Falha ao atualizar memória.' };
  }

  logEvent({
    type: 'learning_updated',
    id: input.id,
    category: result.category,
    rule: result.rule,
    details: { updatedFields: Object.keys(input.updates) },
  });

  return { success: true, entry: result };
}
