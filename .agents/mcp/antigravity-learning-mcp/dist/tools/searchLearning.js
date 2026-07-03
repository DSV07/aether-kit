import { searchLearnings } from '../services/relevanceSearch.js';
import { normalizeCategory } from '../services/memoryNormalizer.js';
import { normalizeTags } from '../utils/tags.js';
export function handleSearchLearning(input) {
    const options = {
        query: input.query,
        category: input.category ? normalizeCategory(input.category) : undefined,
        scope: input.scope,
        tags: input.tags ? normalizeTags(input.tags) : undefined,
        limit: input.limit ?? 20,
    };
    const results = searchLearnings(options);
    return {
        rules: results,
        total: results.length,
    };
}
//# sourceMappingURL=searchLearning.js.map