import {
  Controller,
  Get,
  Headers,
  HttpException,
  Query,
} from '@nestjs/common';
import type {
  AccessContext,
  AccountRepository,
  LinkedAccount,
} from './access-context.js';
import { AccessResolver } from './access.resolver.js';
import { IdentityAdapter } from './identity.adapter.js';
import { canAccessOrganization, type E1Permission } from './permissions.js';
import {
  createSafeAuthorizationError,
  type AuthorizationErrorCode,
} from './security-evidence.js';

const fictionalAccount: LinkedAccount = {
  id: 'account-001',
  identitySubject: 'fictional-employee-001',
  organizationId: 'organization-001',
  role: 'Employee',
  employeeId: 'employee-001',
  managerEmployeeId: 'employee-002',
  active: true,
};

const localAccounts: AccountRepository = {
  findByIdentitySubject: (subject) =>
    subject === fictionalAccount.identitySubject ? fictionalAccount : undefined,
};

@Controller('api/v1/access')
export class AccessController {
  private readonly identityAdapter = new IdentityAdapter();
  private readonly accessResolver = new AccessResolver(localAccounts);

  @Get('me')
  async getMe(
    @Headers('x-identity-subject') subject: string | undefined,
    @Headers('x-identity-issued-at') issuedAt: string | undefined,
    @Headers('x-identity-expires-at') expiresAt: string | undefined,
    @Headers('x-correlation-id') correlationId = 'not-provided',
  ) {
    try {
      const context = await this.resolveContext(
        subject,
        issuedAt,
        expiresAt,
        correlationId,
      );

      return {
        accountId: context.accountId,
        organizationId: context.organizationId,
        role: context.role,
        employeeId: context.employeeId,
        managerEmployeeId: context.managerEmployeeId,
        correlationId,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        this.error('INVALID_IDENTITY', correlationId),
        401,
      );
    }
  }

  @Get('policy-fixture')
  async policyFixture(
    @Query('permission') permission: string,
    @Query('organizationId') organizationId: string,
    @Query('targetId') targetId: string,
    @Headers('x-identity-subject') subject: string | undefined,
    @Headers('x-identity-issued-at') issuedAt: string | undefined,
    @Headers('x-identity-expires-at') expiresAt: string | undefined,
    @Headers('x-correlation-id') correlationId = 'not-provided',
  ) {
    try {
      const context = await this.resolveContext(
        subject,
        issuedAt,
        expiresAt,
        correlationId,
      );
      if (
        !canAccessOrganization(
          context,
          organizationId,
          permission as E1Permission,
        )
      ) {
        throw new HttpException(this.error('ACCESS_DENIED', correlationId), 403);
      }

      return {
        allowed: true,
        permission,
        organizationId,
        targetId,
        correlationId,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        this.error('INVALID_IDENTITY', correlationId),
        401,
      );
    }
  }

  private async resolveContext(
    subject: string | undefined,
    issuedAt: string | undefined,
    expiresAt: string | undefined,
    correlationId: string,
  ): Promise<AccessContext> {
    if (!subject || !issuedAt || !expiresAt) {
      throw new HttpException(this.error('INVALID_IDENTITY', correlationId), 401);
    }

    const identity = this.identityAdapter.resolve({
      subject,
      issuer: 'local-development',
      issuedAt: new Date(issuedAt),
      expiresAt: new Date(expiresAt),
    });
    return this.accessResolver.resolve(identity);
  }

  private error(code: AuthorizationErrorCode, correlationId: string) {
    return createSafeAuthorizationError(code, correlationId);
  }
}
