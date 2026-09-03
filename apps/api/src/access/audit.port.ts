import type { AuthorizationAuditEvent } from './security-evidence.js';

export interface AuditPort {
  emit(event: AuthorizationAuditEvent): void;
}

export class InMemoryAuditPort implements AuditPort {
  private readonly recordedEvents: AuthorizationAuditEvent[] = [];

  emit(event: AuthorizationAuditEvent): void {
    this.recordedEvents.push({ ...event });
  }

  events(): AuthorizationAuditEvent[] {
    return this.recordedEvents.map((event) => ({ ...event }));
  }
}
