import type {
  AccessContext,
  AccountRepository,
} from './access-context.js';
import type { ResolvedIdentity } from './identity.adapter.js';

export class AccessResolver {
  constructor(private readonly accounts: AccountRepository) {}

  async resolve(identity: ResolvedIdentity): Promise<AccessContext> {
    const account = await this.accounts.findByIdentitySubject(identity.subject);

    if (!account || !account.active) {
      throw new Error('Invalid identity');
    }

    return {
      accountId: account.id,
      identity,
      organizationId: account.organizationId,
      role: account.role,
      employeeId: account.employeeId,
      managerEmployeeId: account.managerEmployeeId,
    };
  }
}
