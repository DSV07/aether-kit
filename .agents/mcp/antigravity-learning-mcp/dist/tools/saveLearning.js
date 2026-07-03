import { normalizeCategory, normalizeScope, normalizeRule, normalizeAppliesTo, normalizeConfidence } from '../services/memoryNormalizer.js';
import { normalizeTags } from '../utils/tags.js';
import { generateId } from '../utils/ids.js';
import { nowISO } from '../utils/dates.js';
import { saveEntry, getAllIds, getFileForCategory } from '../storage/memoryStore.js';
import { detectConflicts } from '../services/conflictDetector.js';
import { logEvent } from '../storage/jsonlLogger.js';
export function handleSaveLearning(input) {
    // Validate required fields
    if (!input.rule || input.rule.trim().length === 0) {
        return { success: false, error: 'O campo "rule" é obrigatório.' };
    }
    if (!input.category || input.category.trim().length === 0) {
        return { success: false, error: 'O campo "category" é obrigatório.' };
    }
    // Normalize
    const category = normalizeCategory(input.category);
    const scope = normalizeScope(input.scope || 'global');
    const rule = normalizeRule(input.rule);
    const tags = normalizeTags(input.tags);
    const appliesTo = normalizeAppliesTo(input.applies_to);
    const confidence = normalizeConfidence(input.confidence);
    const source = input.source || 'instrução do usuário';
    const now = nowISO();
    // Check for conflicts
    const conflictResult = detectConflicts(rule, category, scope);
    // Generate ID
    const fileName = getFileForCategory(category);
    const existingIds = getAllIds();
    const id = generateId(fileName, existingIds);
    // Build entry
    const entry = {
        id,
        category,
        scope,
        rule,
        source,
        confidence,
        status: conflictResult.hasConflict ? 'pending-review' : 'active',
        created_at: now,
        updated_at: now,
        tags,
        applies_to: appliesTo,
        examples: input.examples,
    };
    // Save
    saveEntry(entry);
    // Log event
    logEvent({
        type: 'learning_saved',
        id: entry.id,
        category: entry.category,
        rule: entry.rule,
    });
    if (conflictResult.hasConflict) {
        logEvent({
            type: 'conflict_detected',
            id: entry.id,
            category: entry.category,
            rule: entry.rule,
            details: { conflicts: conflictResult.conflicts.map(c => c.id) },
        });
    }
    return {
        success: true,
        entry,
        conflicts: conflictResult.hasConflict ? conflictResult.conflicts : undefined,
    };
}
//# sourceMappingURL=saveLearning.js.map