import { detectConflicts as detect } from '../services/conflictDetector.js';
export function handleDetectConflicts(input) {
    if (!input.rule || input.rule.trim().length === 0) {
        return { hasConflict: false, conflicts: [] };
    }
    return detect(input.rule, input.category, input.scope);
}
//# sourceMappingURL=detectConflicts.js.map