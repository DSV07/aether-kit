export type EventType = 'learning_saved' | 'learning_updated' | 'learning_deleted' | 'conflict_detected' | 'skill_promoted' | 'memory_exported' | 'memory_imported' | 'classification_done';
export interface LogEvent {
    type: EventType;
    id?: string;
    timestamp: string;
    category?: string;
    rule?: string;
    details?: Record<string, unknown>;
}
export declare function logEvent(event: Omit<LogEvent, 'timestamp'>): void;
//# sourceMappingURL=jsonlLogger.d.ts.map