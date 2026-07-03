export interface ImportInput {
    filePath: string;
    overwrite?: boolean;
}
export declare function handleImportMemory(input: ImportInput): {
    success: boolean;
    imported: number;
    skipped: number;
    error?: string;
};
//# sourceMappingURL=importMemory.d.ts.map