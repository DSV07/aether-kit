import { appendFileSync } from 'node:fs';
import { join } from 'node:path';
import { getMcpDataDir, ensureDir } from '../utils/fileSystem.js';
import { nowISO } from '../utils/dates.js';

export type EventType =
  | 'learning_saved'
  | 'learning_updated'
  | 'learning_deleted'
  | 'conflict_detected'
  | 'skill_promoted'
  | 'memory_exported'
  | 'memory_imported'
  | 'classification_done';

export interface LogEvent {
  type: EventType;
  id?: string;
  timestamp: string;
  category?: string;
  rule?: string;
  details?: Record<string, unknown>;
}

export function logEvent(event: Omit<LogEvent, 'timestamp'>): void {
  const dataDir = getMcpDataDir();
  ensureDir(dataDir);

  const filePath = join(dataDir, 'events.jsonl');
  const entry: LogEvent = {
    ...event,
    timestamp: nowISO(),
  };

  appendFileSync(filePath, JSON.stringify(entry) + '\n', 'utf-8');
}
