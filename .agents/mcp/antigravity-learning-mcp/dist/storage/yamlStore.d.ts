import type { LearningEntry } from '../types/learning.js';
import type { MemoryFileName } from '../types/memory.js';
export declare function readMemoryFile(fileName: MemoryFileName): LearningEntry[];
export declare function writeMemoryFile(fileName: MemoryFileName, entries: LearningEntry[]): void;
export declare function appendToMemoryFile(fileName: MemoryFileName, entry: LearningEntry): void;
export declare function updateInMemoryFile(fileName: MemoryFileName, id: string, updater: (entry: LearningEntry) => LearningEntry): LearningEntry | null;
export declare function removeFromMemoryFile(fileName: MemoryFileName, id: string): boolean;
export declare function findInMemoryFile(fileName: MemoryFileName, id: string): LearningEntry | null;
export declare function getAllMemoryFileNames(): MemoryFileName[];
//# sourceMappingURL=yamlStore.d.ts.map