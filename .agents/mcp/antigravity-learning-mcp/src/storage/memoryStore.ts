import type { LearningEntry, LearningCategory } from '../types/learning.js';
import type { MemoryFileName, MemoryQuery, MemorySearchResult } from '../types/memory.js';
import { CATEGORY_TO_FILE } from '../types/memory.js';
import {
  readMemoryFile,
  writeMemoryFile,
  appendToMemoryFile,
  updateInMemoryFile,
  removeFromMemoryFile,
  findInMemoryFile,
  getAllMemoryFileNames,
} from './yamlStore.js';

export function getAllEntries(): LearningEntry[] {
  const allEntries: LearningEntry[] = [];
  for (const fileName of getAllMemoryFileNames()) {
    allEntries.push(...readMemoryFile(fileName));
  }
  return allEntries;
}

export function getActiveEntries(): LearningEntry[] {
  return getAllEntries().filter(e => e.status === 'active');
}

export function getEntriesByCategory(category: LearningCategory): LearningEntry[] {
  return getAllEntries().filter(e => e.category === category);
}

export function getFileForCategory(category: LearningCategory): MemoryFileName {
  return CATEGORY_TO_FILE[category] ?? 'corrections';
}

export function saveEntry(entry: LearningEntry): void {
  const fileName = getFileForCategory(entry.category);
  appendToMemoryFile(fileName, entry);
}

export function updateEntry(
  id: string,
  updater: (entry: LearningEntry) => LearningEntry
): LearningEntry | null {
  for (const fileName of getAllMemoryFileNames()) {
    const result = updateInMemoryFile(fileName, id, updater);
    if (result) return result;
  }
  return null;
}

export function deleteEntry(id: string, hard: boolean = false): boolean {
  if (hard) {
    for (const fileName of getAllMemoryFileNames()) {
      if (removeFromMemoryFile(fileName, id)) return true;
    }
    return false;
  }

  const result = updateEntry(id, entry => ({
    ...entry,
    status: 'inactive',
    updated_at: new Date().toISOString(),
  }));
  return result !== null;
}

export function findEntryById(id: string): LearningEntry | null {
  for (const fileName of getAllMemoryFileNames()) {
    const entry = findInMemoryFile(fileName, id);
    if (entry) return entry;
  }
  return null;
}

export function getAllIds(): string[] {
  return getAllEntries().map(e => e.id);
}

export function getFileForId(id: string): MemoryFileName | null {
  for (const fileName of getAllMemoryFileNames()) {
    const entry = findInMemoryFile(fileName, id);
    if (entry) return fileName;
  }
  return null;
}
