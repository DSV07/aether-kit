import { join } from 'node:path';
import { getActiveEntries, getEntriesByCategory } from '../storage/memoryStore.js';
import { getGeneratedSkillsDir, ensureDir, writeFileSafe } from '../utils/fileSystem.js';
import { detectConflicts } from './conflictDetector.js';
export function promoteToSkill(input) {
    // Gather entries
    let entries = [];
    if (input.ruleIds && input.ruleIds.length > 0) {
        const allEntries = getActiveEntries();
        entries = allEntries.filter(e => input.ruleIds.includes(e.id));
    }
    else {
        for (const cat of input.categories) {
            entries.push(...getEntriesByCategory(cat).filter(e => e.status === 'active'));
        }
    }
    // Remove duplicates by rule text
    const seen = new Set();
    let duplicatesRemoved = 0;
    const uniqueEntries = entries.filter(entry => {
        const normalized = entry.rule.toLowerCase().trim();
        if (seen.has(normalized)) {
            duplicatesRemoved++;
            return false;
        }
        seen.add(normalized);
        return true;
    });
    // Check for internal conflicts
    let conflictsFound = 0;
    const nonConflicting = [];
    for (const entry of uniqueEntries) {
        const others = uniqueEntries.filter(e => e.id !== entry.id);
        let hasConflict = false;
        for (const other of others) {
            const result = detectConflicts(entry.rule, entry.category);
            if (result.hasConflict) {
                conflictsFound++;
                hasConflict = true;
                break;
            }
        }
        if (!hasConflict) {
            nonConflicting.push(entry);
        }
    }
    // Build SKILL.md content
    const skillContent = buildSkillContent(input.skillName, nonConflicting);
    // Determine output path
    const outputDir = input.outputPath
        ? input.outputPath
        : join(getGeneratedSkillsDir(), input.skillName);
    ensureDir(outputDir);
    const skillPath = join(outputDir, 'SKILL.md');
    writeFileSafe(skillPath, skillContent);
    return {
        skillName: input.skillName,
        path: skillPath,
        rulesIncluded: nonConflicting.length,
        conflictsFound,
        duplicatesRemoved,
    };
}
function buildSkillContent(name, entries) {
    const categories = [...new Set(entries.map(e => e.category))];
    const tags = [...new Set(entries.flatMap(e => e.tags))];
    const appliesTo = [...new Set(entries.flatMap(e => e.applies_to))];
    const description = `Skill gerada automaticamente a partir de ${entries.length} memórias consolidadas. Categorias: ${categories.join(', ')}.`;
    const whenToUse = `Quando trabalhar com ${appliesTo.join(', ')}.`;
    // Group rules by category
    const rulesByCategory = new Map();
    for (const entry of entries) {
        if (!rulesByCategory.has(entry.category)) {
            rulesByCategory.set(entry.category, []);
        }
        rulesByCategory.get(entry.category).push(entry);
    }
    let body = '';
    body += `---\n`;
    body += `name: ${name}\n`;
    body += `description: "${description}"\n`;
    body += `when_to_use: "${whenToUse}"\n`;
    body += `allowed-tools: Read, Grep, Glob\n`;
    body += `---\n\n`;
    body += `# ${formatSkillTitle(name)}\n\n`;
    body += `## Objetivo\n\n`;
    body += `Aplicar padrões consolidados do usuário para ${categories.join(', ')}.\n\n`;
    body += `## Quando usar\n\n`;
    body += `- ${whenToUse}\n\n`;
    body += `## Quando NÃO usar\n\n`;
    body += `- Quando o usuário der uma instrução que contradiga estas regras (a instrução atual sempre vence).\n\n`;
    body += `## Regras\n\n`;
    for (const [category, catEntries] of rulesByCategory) {
        body += `### ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;
        for (const entry of catEntries) {
            body += `- ${entry.rule}\n`;
        }
        body += '\n';
    }
    // Add examples if available
    const entriesWithExamples = entries.filter(e => e.examples);
    if (entriesWithExamples.length > 0) {
        body += `## Exemplos\n\n`;
        for (const entry of entriesWithExamples) {
            if (entry.examples?.bad) {
                body += `### ❌ Não faça\n\n`;
                for (const bad of entry.examples.bad) {
                    body += `- \`${bad}\`\n`;
                }
                body += '\n';
            }
            if (entry.examples?.good) {
                body += `### ✅ Faça\n\n`;
                for (const good of entry.examples.good) {
                    body += `- \`${good}\`\n`;
                }
                body += '\n';
            }
        }
    }
    body += `## Prioridade\n\n`;
    body += `A instrução atual do usuário sempre vence estas regras.\n\n`;
    body += `## Restrições\n\n`;
    body += `- Não aplicar regras conflitantes com a instrução atual.\n`;
    body += `- Não salvar pedidos pontuais como regras desta Skill.\n`;
    return body;
}
function formatSkillTitle(name) {
    return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
//# sourceMappingURL=skillPromoter.js.map