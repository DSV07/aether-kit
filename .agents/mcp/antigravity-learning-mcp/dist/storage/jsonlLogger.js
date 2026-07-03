import { appendFileSync } from 'node:fs';
import { join } from 'node:path';
import { getMcpDataDir, ensureDir } from '../utils/fileSystem.js';
import { nowISO } from '../utils/dates.js';
export function logEvent(event) {
    const dataDir = getMcpDataDir();
    ensureDir(dataDir);
    const filePath = join(dataDir, 'events.jsonl');
    const entry = {
        ...event,
        timestamp: nowISO(),
    };
    appendFileSync(filePath, JSON.stringify(entry) + '\n', 'utf-8');
}
//# sourceMappingURL=jsonlLogger.js.map