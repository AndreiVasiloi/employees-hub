export type AuthorizationErrorCode = 'INVALID_IDENTITY' | 'ACCESS_DENIED';

export interface SafeAuthorizationError {
  code: AuthorizationErrorCode;
  status: 401 | 403;
  message: string;
  correlationId: string;
}

export interface AuthorizationAuditInput {
  actorId: string | null;
  organizationId: string | null;
  action: string;
  targetId: string | null;
  outcome: 'allowed' | 'denied';
  correlationId: string;
  occurredAt: Date;
  metadata?: Record<string, unknown>;
}

export interface AuthorizationAuditEvent {
  actorId: string | null;
  organizationId: string | null;
  action: string;
  targetId: string | null;
  outcome: 'allowed' | 'denied';
  correlationId: string;
  occurredAt: Date;
}

export function createSafeAuthorizationError(
  code: AuthorizationErrorCode,
  correlationId: string,
): SafeAuthorizationError {
  return {
    code,
    status: code === 'INVALID_IDENTITY' ? 401 : 403,
    message:
      code === 'INVALID_IDENTITY'
        ? 'The request identity could not be verified.'
        : 'The requested action is not permitted.',
    correlationId,
  };
}

export function createAuthorizationAuditEvent(
  input: AuthorizationAuditInput,
): AuthorizationAuditEvent {
  return {
    actorId: input.actorId,
    organizationId: input.organizationId,
    action: input.action,
    targetId: input.targetId,
    outcome: input.outcome,
    correlationId: input.correlationId,
    occurredAt: input.occurredAt,
  };
}
