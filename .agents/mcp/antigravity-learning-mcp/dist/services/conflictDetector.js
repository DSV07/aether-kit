import { getActiveEntries, getEntriesByCategory } from '../storage/memoryStore.js';
export function detectConflicts(newRule, category, scope) {
    const entries = category
        ? getEntriesByCategory(category).filter(e => e.status === 'active')
        : getActiveEntries();
    const conflicts = [];
    const newRuleLower = newRule.toLowerCase();
    const newRuleWords = extractKeyWords(newRuleLower);
    for (const entry of entries) {
        const existingLower = entry.rule.toLowerCase();
        const existingWords = extractKeyWords(existingLower);
        const similarity = wordOverlap(newRuleWords, existingWords);
        if (similarity < 0.25)
            continue;
        const isContradiction = checkContradiction(newRuleLower, existingLower);
        if (isContradiction) {
            conflicts.push({
                id: entry.id,
                rule: entry.rule,
                reason: buildConflictReason(newRule, entry.rule),
                category: entry.category,
                confidence: entry.confidence,
            });
        }
    }
    return {
        hasConflict: conflicts.length > 0,
        conflicts,
    };
}
function extractKeyWords(text) {
    const stopWords = new Set([
        'a', 'o', 'e', 'de', 'do', 'da', 'em', 'no', 'na', 'um', 'uma',
        'que', 'com', 'para', 'por', 'como', 'não', 'se', 'mais', 'mas',
        'the', 'a', 'an', 'and', 'or', 'in', 'on', 'at', 'to', 'for',
        'is', 'are', 'was', 'be', 'of', 'it', 'this', 'that', 'with',
        'usar', 'use', 'criar', 'create', 'fazer', 'do', 'ser', 'ter',
    ]);
    return text
        .replace(/[^\w\sáàâãéèêíìîóòôõúùûç-]/gi, '')
        .split(/\s+/)
        .filter(w => w.length > 2 && !stopWords.has(w));
}
function wordOverlap(wordsA, wordsB) {
    if (wordsA.length === 0 || wordsB.length === 0)
        return 0;
    const setA = new Set(wordsA);
    const setB = new Set(wordsB);
    let overlap = 0;
    for (const word of setA) {
        if (setB.has(word))
            overlap++;
    }
    const totalUnique = new Set([...setA, ...setB]).size;
    return totalUnique > 0 ? overlap / totalUnique : 0;
}
function checkContradiction(ruleA, ruleB) {
    // Pattern: "use X" vs "use Y" (different values for same subject)
    const usePatternA = ruleA.match(/(?:usar?|use|preferir|prefer)\s+(\w+)/i);
    const usePatternB = ruleB.match(/(?:usar?|use|preferir|prefer)\s+(\w+)/i);
    if (usePatternA && usePatternB) {
        const subjectA = findSubject(ruleA);
        const subjectB = findSubject(ruleB);
        if (subjectA && subjectB && subjectA === subjectB) {
            if (usePatternA[1].toLowerCase() !== usePatternB[1].toLowerCase()) {
                return true;
            }
        }
    }
    // Pattern: "use X" vs "não use X" / "avoid X"
    const negationPairs = [
        [/\bnão\s+usar?\b/i, /\busar?\b/i],
        [/\bevitar?\b/i, /\busar?\b/i],
        [/\bnunca\b/i, /\bsempre\b/i],
        [/\bnever\b/i, /\balways\b/i],
        [/\bavoid\b/i, /\buse\b/i],
        [/\bdon'?t\b/i, /\bdo\b/i],
    ];
    for (const [negPattern, posPattern] of negationPairs) {
        const aHasNeg = negPattern.test(ruleA) && posPattern.test(ruleB);
        const bHasNeg = negPattern.test(ruleB) && posPattern.test(ruleA);
        if (aHasNeg || bHasNeg) {
            const overlapScore = wordOverlap(extractKeyWords(ruleA), extractKeyWords(ruleB));
            if (overlapScore > 0.3)
                return true;
        }
    }
    // Pattern: database conflicts (MySQL vs PostgreSQL vs MongoDB etc)
    const dbNames = ['mysql', 'postgresql', 'postgres', 'mongodb', 'sqlite', 'mariadb', 'oracle', 'sqlserver'];
    const dbInA = dbNames.filter(db => ruleA.includes(db));
    const dbInB = dbNames.filter(db => ruleB.includes(db));
    if (dbInA.length > 0 && dbInB.length > 0) {
        const sameSubject = ruleA.includes('padrão') || ruleA.includes('default') ||
            ruleB.includes('padrão') || ruleB.includes('default');
        if (sameSubject && dbInA[0] !== dbInB[0])
            return true;
    }
    return false;
}
function findSubject(rule) {
    const subjects = [
        'banco', 'database', 'framework', 'linguagem', 'language',
        'estilo', 'style', 'formatação', 'padrão', 'default',
    ];
    for (const subject of subjects) {
        if (rule.includes(subject))
            return subject;
    }
    return null;
}
function buildConflictReason(newRule, existingRule) {
    return `Conflita com regra ativa: "${existingRule.substring(0, 80)}${existingRule.length > 80 ? '...' : ''}"`;
}
//# sourceMappingURL=conflictDetector.js.map