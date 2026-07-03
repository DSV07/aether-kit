import { join } from 'node:path';
import * as yaml from 'js-yaml';
import { getMemoryDir } from '../utils/fileSystem.js';
import { readFileSafe, writeFileSafe } from '../utils/fileSystem.js';
const FILE_KEYS = {
    preferences: 'preferences',
    corrections: 'corrections',
    stacks: 'stacks',
    'design-patterns': 'design_patterns',
    'project-rules': 'project_rules',
    workflows: 'workflows',
};
function getFilePath(fileName) {
    return join(getMemoryDir(), `${fileName}.yml`);
}
export function readMemoryFile(fileName) {
    const filePath = getFilePath(fileName);
    const content = readFileSafe(filePath);
    if (!content)
        return [];
    try {
        const data = yaml.load(content);
        if (!data)
            return [];
        const key = FILE_KEYS[fileName];
        const entries = data[key];
        if (!Array.isArray(entries))
            return [];
        return entries;
    }
    catch {
        return [];
    }
}
export function writeMemoryFile(fileName, entries) {
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
export function appendToMemoryFile(fileName, entry) {
    const entries = readMemoryFile(fileName);
    entries.push(entry);
    writeMemoryFile(fileName, entries);
}
export function updateInMemoryFile(fileName, id, updater) {
    const entries = readMemoryFile(fileName);
    const index = entries.findIndex(e => e.id === id);
    if (index === -1)
        return null;
    entries[index] = updater(entries[index]);
    writeMemoryFile(fileName, entries);
    return entries[index];
}
export function removeFromMemoryFile(fileName, id) {
    const entries = readMemoryFile(fileName);
    const index = entries.findIndex(e => e.id === id);
    if (index === -1)
        return false;
    entries.splice(index, 1);
    writeMemoryFile(fileName, entries);
    return true;
}
export function findInMemoryFile(fileName, id) {
    const entries = readMemoryFile(fileName);
    return entries.find(e => e.id === id) ?? null;
}
export function getAllMemoryFileNames() {
    return Object.keys(FILE_KEYS);
}
//# sourceMappingURL=yamlStore.js.map