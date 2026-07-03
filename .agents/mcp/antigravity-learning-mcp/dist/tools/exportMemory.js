import { join } from 'node:path';
import { getAllEntries } from '../storage/memoryStore.js';
import { writeFileSafe, getMcpDataDir, ensureDir } from '../utils/fileSystem.js';
import { nowISO } from '../utils/dates.js';
import { logEvent } from '../storage/jsonlLogger.js';
export function handleExportMemory(input) {
    try {
        const entries = getAllEntries();
        const exportData = {
            exportedAt: nowISO(),
            version: '1.0.0',
            totalEntries: entries.length,
            entries,
        };
        const outputPath = input.outputPath
            ?? join(getMcpDataDir(), `memory-export-${Date.now()}.json`);
        ensureDir(getMcpDataDir());
        writeFileSafe(outputPath, JSON.stringify(exportData, null, 2));
        logEvent({
            type: 'memory_exported',
            details: { path: outputPath, totalEntries: entries.length },
        });
        return {
            success: true,
            path: outputPath,
            totalEntries: entries.length,
        };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Erro desconhecido';
        return { success: false, path: '', totalEntries: 0, error: message };
    }
}
//# sourceMappingURL=exportMemory.js.map