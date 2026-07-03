import { join } from 'node:path';
import * as yaml from 'js-yaml';
import { getMemoryDir } from '../utils/fileSystem.js';
import { readFileSafe, writeFileSafe } from '../utils/fileSystem.js';
import type { LearningEntry } from '../types/learning.js';
import type { MemoryFileName, MEMORY_FILE_KEYS } from '../types/memory.js';

const FILE_KEYS: Record<MemoryFileName, string> = {
  preferences: 'preferences',
  corrections: 'corrections',
  stacks: 'stacks',
  'design-patterns': 'design_patterns',
  'project-rules': 'project_rules',
  workflows: 'workflows',
};

function getFilePath(fileName: MemoryFileName): string {
  return join(getMemoryDir(), `${fileName}.yml`);
}

export function readMemoryFile(fileName: MemoryFileName): LearningEntry[] {
  const filePath = getFilePath(fileName);
  const content = readFileSafe(filePath);

  if (!content) return [];

  try {
    const data = yaml.load(content) as Record<string, unknown>;
    if (!data) return [];

    const key = FILE_KEYS[fileName];
    const entries = data[key];

    if (!Array.isArray(entries)) return [];
    return entries as LearningEntry[];
  } catch {
    return [];
  }
}

export function writeMemoryFile(fileName: MemoryFileName, entries: LearningEntry[]): void {
  const key = FILE_KEYS[fileName];
  const data = { [key]: entries };
  const content = yaml.dump(data, {
    indent: 2,
    lineWidth: 120,
    noRefs: true,
    sortKeys: false,
    quotingType: '"',
    forceQuotes: false,
  });

  writeFileSafe(getFilePath(fileName), content);
}

export function appendToMemoryFile(fileName: MemoryFileName, entry: LearningEntry): void {
  const entries = readMemoryFile(fileName);
  entries.push(entry);
  writeMemoryFile(fileName, entries);
}

export function updateInMemoryFile(
  fileName: MemoryFileName,
  id: string,
  updater: (entry: LearningEntry) => LearningEntry
): LearningEntry | null {
  const entries = readMemoryFile(fileName);
  const index = entries.findIndex(e => e.id === id);

  if (index === -1) return null;

  entries[index] = updater(entries[index]);
  writeMemoryFile(fileName, entries);
  return entries[index];
}

export function removeFromMemoryFile(fileName: MemoryFileName, id: string): boolean {
  const entries = readMemoryFile(fileName);
  const index = entries.findIndex(e => e.id === id);

  if (index === -1) return false;

  entries.splice(index, 1);
  writeMemoryFile(fileName, entries);
  return true;
}

export function findInMemoryFile(fileName: MemoryFileName, id: string): LearningEntry | null {
  const entries = readMemoryFile(fileName);
  return entries.find(e => e.id === id) ?? null;
}

export function getAllMemoryFileNames(): MemoryFileName[] {
  return Object.keys(FILE_KEYS) as MemoryFileName[];
}
