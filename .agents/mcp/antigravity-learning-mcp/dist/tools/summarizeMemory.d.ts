export interface SummarizeInput {
    category?: string;
    maxItems?: number;
}
export declare function handleSummarizeMemory(input: SummarizeInput): {
    totalActive: number;
    totalAll: number;
    byCategory: Record<string, number>;
    byScope: Record<string, number>;
    byStatus: Record<string, number>;
    topRules: Array<{
        id: string;
        category: string;
        rule: string;
        confidence: number;
    }>;
};
//# sourceMappingURL=summarizeMemory.d.ts.map