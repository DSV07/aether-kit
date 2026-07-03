import type { ClassifyInstructionInput, ClassifyInstructionResult } from '../types/learning.js';
import { classifyInstruction } from '../services/learningClassifier.js';
import { logEvent } from '../storage/jsonlLogger.js';

export function handleClassifyInstruction(input: ClassifyInstructionInput): ClassifyInstructionResult {
  if (!input.userMessage || input.userMessage.trim().length === 0) {
    return {
      shouldSave: false,
      reason: 'Mensagem vazia.',
      category: 'general',
      scope: 'global',
      rule: '',
      confidence: 0,
      tags: [],
    };
  }

  const result = classifyInstruction(input.userMessage, input.context);

  logEvent({
    type: 'classification_done',
    details: {
      shouldSave: result.shouldSave,
      category: result.category,
      confidence: result.confidence,
      messagePreview: input.userMessage.substring(0, 80),
    },
  });

  return result;
}
