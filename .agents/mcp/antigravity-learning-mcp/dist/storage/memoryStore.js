import { CATEGORY_TO_FILE } from '../types/memory.js';
import { readMemoryFile, appendToMemoryFile, updateInMemoryFile, removeFromMemoryFile, findInMemoryFile, getAllMemoryFileNames, } from './yamlStore.js';
export function getAllEntries() {
    const allEntries = [];
    for (const fileName of getAllMemoryFileNames()) {
        allEntries.push(...readMemoryFile(fileName));
    }
    return allEntries;
}
export function getActiveEntries() {
    return getAllEntries().filter(e => e.status === 'active');
}
export function getEntriesByCategory(category) {
    return getAllEntries().filter(e => e.category === category);
}
export function getFileForCategory(category) {
    return CATEGORY_TO_FILE[category] ?? 'corrections';
}
export function saveEntry(entry) {
    const fileName = getFileForCategory(entry.category);
    appendToMemoryFile(fileName, entry);
}
export function updateEntry(id, updater) {
    for (const fileName of getAllMemoryFileNames()) {
        const result = updateInMemoryFile(fileName, id, updater);
        if (result)
            return result;
    }
    return null;
}
export function deleteEntry(id, hard = false) {
    if (hard) {
        for (const fileName of getAllMemoryFileNames()) {
            if (removeFromMemoryFile(fileName, id))
                return true;
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
export function findEntryById(id) {
    for (const fileName of getAllMemoryFileNames()) {
        const entry = findInMemoryFile(fileName, id);
        if (entry)
            return entry;
    }
    return null;
}
export function getAllIds() {
    return getAllEntries().map(e => e.id);
}
export function getFileForId(id) {
    for (const fileName of getAllMemoryFileNames()) {
        const entry = findInMemoryFile(fileName, id);
        if (entry)
            return fileName;
    }
    return null;
}
//# sourceMappingURL=memoryStore.js.map