import { readFileSync, existsSync } from 'node:fs';
import type { LearningEntry } from '../types/learning.js';
import { saveEntry } from '../storage/memoryStore.js';
import { logEvent } from '../storage/jsonlLogger.js';

export interface ImportInput {
  filePath: string;
  overwrite?: boolean;
}

export function handleImportMemory(input: ImportInput): {
  success: boolean;
  imported: number;
  skipped: number;
  error?: string;
} {
  if (!input.filePath || !existsSync(input.filePath)) {
    return { success: false, imported: 0, skipped: 0, error: `Arquivo não encontrado: ${input.filePath}` };
  }

  try {
    const raw = readFileSync(input.filePath, 'utf-8');
    const data = JSON.parse(raw) as {
      entries: LearningEntry[];
    };

    if (!Array.isArray(data.entries)) {
      return { success: false, imported: 0, skipped: 0, error: 'Formato inválido: campo "entries" não é um array.' };
    }

    let imported = 0;
    let skipped = 0;

    for (const entry of data.entries) {
      if (!entry.id || !entry.rule || !entry.category) {
        skipped++;
        continue;
      }

      try {
        saveEntry(entry);
        imported++;
      } catch {
        skipped++;
      }
    }

    logEvent({
      type: 'memory_imported',
      details: { filePath: input.filePath, imported, skipped },
    });

    return { success: true, imported, skipped };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido';
    return { success: false, imported: 0, skipped: 0, error: message };
  }
}
