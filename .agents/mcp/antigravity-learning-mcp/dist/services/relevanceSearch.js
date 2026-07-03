import { getActiveEntries, getAllEntries } from '../storage/memoryStore.js';
import { normalizeTags } from '../utils/tags.js';
export function searchLearnings(options) {
    const { query, category, scope, tags, limit = 20, includeInactive = false, } = options;
    let entries = includeInactive
        ? getAllEntries()
        : getActiveEntries();
    if (category) {
        entries = entries.filter(e => e.category === category);
    }
    if (scope) {
        entries = entries.filter(e => e.scope === scope || e.scope === 'global');
    }
    if (tags && tags.length > 0) {
        const normalizedSearchTags = normalizeTags(tags);
        entries = entries.filter(e => {
            const entryTags = normalizeTags(e.tags);
            return normalizedSearchTags.some(t => entryTags.includes(t));
        });
    }
    const scored = [];
    for (const entry of entries) {
        let score = 0;
        score += entry.confidence * 0.3;
        if (query) {
            const queryWords = extractSearchWords(query);
            const ruleWords = extractSearchWords(entry.rule);
            const tagWords = normalizeTags(entry.tags);
            const appliesTo = entry.applies_to.map(a => a.toLowerCase());
            let ruleMatches = 0;
            for (const qw of queryWords) {
                if (ruleWords.some(rw => rw.includes(qw) || qw.includes(rw))) {
                    ruleMatches++;
                }
            }
            if (queryWords.length > 0) {
                score += (ruleMatches / queryWords.length) * 0.4;
            }
            let tagMatches = 0;
            for (const qw of queryWords) {
                if (tagWords.some(tw => tw.includes(qw) || qw.includes(tw))) {
                    tagMatches++;
                }
            }
            if (queryWords.length > 0) {
                score += (tagMatches / queryWords.length) * 0.2;
            }
            let applyMatches = 0;
            for (const qw of queryWords) {
                if (appliesTo.some(a => a.includes(qw) || qw.includes(a))) {
                    applyMatches++;
                }
            }
            if (queryWords.length > 0) {
                score += (applyMatches / queryWords.length) * 0.1;
            }
        }
        else {
            score += 0.5;
        }
        if (entry.scope === 'global')
            score += 0.05;
        scored.push({ entry, score });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map(({ entry, score }) => ({
        id: entry.id,
        category: entry.category,
        rule: entry.rule,
        relevance: Math.round(score * 100) / 100,
        tags: entry.tags,
        scope: entry.scope,
    }));
}
function extractSearchWords(text) {
    const stopWords = new Set([
        'a', 'o', 'e', 'de', 'do', 'da', 'em', 'no', 'na', 'um', 'uma',
        'que', 'com', 'para', 'por', 'como', 'se', 'mais', 'mas',
        'the', 'an', 'and', 'or', 'in', 'on', 'at', 'to', 'for',
        'is', 'are', 'was', 'be', 'of', 'it', 'this', 'that', 'with',
    ]);
    return text
        .toLowerCase()
        .replace(/[^\w\sáàâãéèêíìîóòôõúùûç-]/gi, '')
        .split(/\s+/)
        .filter(w => w.length > 2 && !stopWords.has(w));
}
//# sourceMappingURL=relevanceSearch.js.map