import type { DeleteLearningInput } from '../types/learning.js';
import { deleteEntry, findEntryById } from '../storage/memoryStore.js';
import { logEvent } from '../storage/jsonlLogger.js';

export function handleDeleteLearning(input: DeleteLearningInput): {
  success: boolean;
  action: 'soft-delete' | 'hard-delete';
  error?: string;
} {
  if (!input.id) {
    return { success: false, action: 'soft-delete', error: 'O campo "id" é obrigatório.' };
  }

  const existing = findEntryById(input.id);
  if (!existing) {
    return { success: false, action: 'soft-delete', error: `Memória com id "${input.id}" não encontrada.` };
  }

  const hard = input.hardDelete === true;
  const result = deleteEntry(input.id, hard);

  if (!result) {
    return { success: false, action: hard ? 'hard-delete' : 'soft-delete', error: 'Falha ao deletar memória.' };
  }

  logEvent({
    type: 'learning_deleted',
    id: input.id,
    category: existing.category,
    rule: existing.rule,
    details: { hardDelete: hard },
  });

  return {
    success: true,
    action: hard ? 'hard-delete' : 'soft-delete',
  };
}
