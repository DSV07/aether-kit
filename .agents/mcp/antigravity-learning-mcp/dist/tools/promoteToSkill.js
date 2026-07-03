import { promoteToSkill as promote } from '../services/skillPromoter.js';
import { logEvent } from '../storage/jsonlLogger.js';
export function handlePromoteToSkill(input) {
    if (!input.skillName || input.skillName.trim().length === 0) {
        return { success: false, error: 'O campo "skillName" é obrigatório.' };
    }
    if (!input.categories || input.categories.length === 0) {
        return { success: false, error: 'É necessário informar ao menos uma categoria.' };
    }
    try {
        const result = promote(input);
        logEvent({
            type: 'skill_promoted',
            id: input.skillName,
            details: {
                path: result.path,
                rulesIncluded: result.rulesIncluded,
                conflictsFound: result.conflictsFound,
                duplicatesRemoved: result.duplicatesRemoved,
            },
        });
        return { success: true, result };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Erro desconhecido';
        return { success: false, error: `Falha ao promover para Skill: ${message}` };
    }
}
//# sourceMappingURL=promoteToSkill.js.map