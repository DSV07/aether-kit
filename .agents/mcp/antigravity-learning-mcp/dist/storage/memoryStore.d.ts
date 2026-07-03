import type { LearningEntry, LearningCategory } from '../types/learning.js';
import type { MemoryFileName } from '../types/memory.js';
export declare function getAllEntries(): LearningEntry[];
export declare function getActiveEntries(): LearningEntry[];
export declare function getEntriesByCategory(category: LearningCategory): LearningEntry[];
export declare function getFileForCategory(category: LearningCategory): MemoryFileName;
export declare function saveEntry(entry: LearningEntry): void;
export declare function updateEntry(id: string, updater: (entry: LearningEntry) => LearningEntry): LearningEntry | null;
export declare function deleteEntry(id: string, hard?: boolean): boolean;
export declare function findEntryById(id: string): LearningEntry | null;
export declare function getAllIds(): string[];
export declare function getFileForId(id: string): MemoryFileName | null;
//# sourceMappingURL=memoryStore.d.ts.map