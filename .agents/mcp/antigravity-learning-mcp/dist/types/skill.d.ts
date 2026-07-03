export interface SkillDefinition {
    name: string;
    description: string;
    when_to_use: string;
    rules: string[];
    do_not_use?: string[];
    examples?: string[];
    priority?: string[];
    restrictions?: string[];
}
export interface SkillPromotionInput {
    skillName: string;
    categories: string[];
    ruleIds?: string[];
    outputPath?: string;
}
export interface SkillPromotionResult {
    skillName: string;
    path: string;
    rulesIncluded: number;
    conflictsFound: number;
    duplicatesRemoved: number;
}
export interface GeneratedSkillContent {
    frontmatter: string;
    body: string;
}
//# sourceMappingURL=skill.d.ts.map