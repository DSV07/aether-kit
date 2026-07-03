const ID_PREFIXES = {
    preferences: 'pref',
    corrections: 'learn',
    stacks: 'stack',
    'design-patterns': 'design',
    'project-rules': 'proj',
    workflows: 'wf',
    default: 'learn',
};
export function generateId(memoryFile, existingIds) {
    const prefix = ID_PREFIXES[memoryFile] ?? ID_PREFIXES.default;
    let maxNum = 0;
    for (const id of existingIds) {
        const match = id.match(new RegExp(`^${prefix}_(\\d+)$`));
        if (match) {
            const num = parseInt(match[1], 10);
            if (num > maxNum)
                maxNum = num;
        }
    }
    const nextNum = maxNum + 1;
    return `${prefix}_${nextNum.toString().padStart(6, '0')}`;
}
export function getPrefixForFile(memoryFile) {
    return ID_PREFIXES[memoryFile] ?? ID_PREFIXES.default;
}
//# sourceMappingURL=ids.js.map