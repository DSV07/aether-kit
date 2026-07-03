import { getAllEntries } from '../storage/memoryStore.js';
import { normalizeCategory, normalizeScope, normalizeStatus } from '../services/memoryNormalizer.js';
export function handleListLearnings(input) {
    let entries = getAllEntries();
    const filters = {};
    if (input.category) {
        const cat = normalizeCategory(input.category);
        entries = entries.filter(e => e.category === cat);
        filters.category = cat;
    }
    if (input.status) {
        const status = normalizeStatus(input.status);
        entries = entries.filter(e => e.status === status);
        filters.status = status;
    }
    if (input.scope) {
        const scope = normalizeScope(input.scope);
        entries = entries.filter(e => e.scope === scope);
        filters.scope = scope;
    }
    return {
        entries,
        total: entries.length,
        filters,
    };
}
//# sourceMappingURL=listLearnings.js.map