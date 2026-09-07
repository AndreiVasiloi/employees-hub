import { HttpException } from '@nestjs/common';
import type { AccessContext, LinkedAccount } from './access-context.js';
import { AccessResolver } from './access.resolver.js';
import { IdentityAdapter } from './identity.adapter.js';
import { hasPermission, type E1Permission } from './permissions.js';
import { createSafeAuthorizationError } from './security-evidence.js';
import { OptimisticLockError } from '../common/optimistic-lock.error.js';

const localAccounts: LinkedAccount[] = [
  {
    id: 'account-hr-001',
    identitySubject: 'fictional-hr-001',
    organizationId: 'organization-001',
    role: 'HR',
    employeeId: 'employee-hr-001',
    managerEmployeeId: null,
    active: true,
  },
  {
    id: 'account-manager-001',
    identitySubject: 'fictional-manager-001',
    organizationId: 'organization-001',
    role: 'Manager',
    employeeId: 'employee-manager-001',
    managerEmployeeId: null,
    active: true,
  },
  {
    id: 'account-employee-001',
    identitySubject: 'fictional-employee-001',
    organizationId: 'organization-001',
    role: 'Employee',
    employeeId: 'employee-001',
    managerEmployeeId: 'employee-manager-001',
    active: true,
  },
];

export class AccessRequestExecutor {
  private readonly identityAdapter = new IdentityAdapter();
  private readonly accessResolver = new AccessResolver({
    findByIdentitySubject: (subject) =>
      localAccounts.find((account) => account.identitySubject === subject),
  });

  async execute<T>(
    headers: Record<string, string | undefined>,
    permission: E1Permission,
    operation: (context: AccessContext, correlationId: string) => Promise<T>,
  ): Promise<T> {
    const correlationId = headers['x-correlation-id'] ?? 'not-provided';
    try {
      const context = await this.context(headers, correlationId);
      if (!hasPermission(context.role, permission))
        throw new HttpException(
          createSafeAuthorizationError('ACCESS_DENIED', correlationId),
          403,
        );
      return await operation(context, correlationId);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error instanceof OptimisticLockError)
        throw new HttpException({ message: error.message, correlationId }, 409);
      throw new HttpException(
        {
          message:
            error instanceof Error
              ? error.message
              : 'Invalid workforce request',
          correlationId,
        },
        400,
      );
    }
  }

  page(
    organizationId: string,
    limit: string | undefined,
    offset: string | undefined,
  ) {
    const parsedLimit = Number(limit ?? 50);
    const parsedOffset = Number(offset ?? 0);
    if (
      !Number.isInteger(parsedLimit) ||
      !Number.isInteger(parsedOffset) ||
      parsedLimit < 1 ||
      parsedOffset < 0
    )
      throw new Error('Invalid pagination');
    return {
      organizationId,
      limit: Math.min(parsedLimit, 50),
      offset: parsedOffset,
    };
  }

  required<T>(value: T | undefined): T {
    if (!value) throw new HttpException({ message: 'Resource not found' }, 404);
    return value;
  }

  private async context(
    headers: Record<string, string | undefined>,
    correlationId: string,
  ): Promise<AccessContext> {
    const subject = headers['x-identity-subject'];
    const issuedAt = headers['x-identity-issued-at'];
    const expiresAt = headers['x-identity-expires-at'];
    if (!subject || !issuedAt || !expiresAt)
      throw new HttpException(
        createSafeAuthorizationError('INVALID_IDENTITY', correlationId),
        401,
      );
    return this.accessResolver.resolve(
      this.identityAdapter.resolve({
        subject,
        issuer: 'local-development',
        issuedAt: new Date(issuedAt),
        expiresAt: new Date(expiresAt),
      }),
    );
  }
}
