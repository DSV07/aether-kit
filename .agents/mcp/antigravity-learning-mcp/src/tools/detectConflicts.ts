import type { ConflictDetectionInput, ConflictResult } from '../types/conflict.js';
import { detectConflicts as detect } from '../services/conflictDetector.js';

export function handleDetectConflicts(input: ConflictDetectionInput): ConflictResult {
  if (!input.rule || input.rule.trim().length === 0) {
    return { hasConflict: false, conflicts: [] };
  }

  return detect(input.rule, input.category, input.scope);
}
