import type { ResolvedIdentity } from './identity.adapter.js';

export type FixedRole = 'Employee' | 'Manager' | 'HR' | 'Administrator';

export interface LinkedAccount {
  id: string;
  identitySubject: string;
  organizationId: string;
  role: FixedRole;
  employeeId: string | null;
  managerEmployeeId: string | null;
  active: boolean;
}

export interface AccessContext {
  accountId: string;
  identity: ResolvedIdentity;
  organizationId: string;
  role: FixedRole;
  employeeId: string | null;
  managerEmployeeId: string | null;
}

export interface AccountRepository {
  findByIdentitySubject(subject: string): LinkedAccount | undefined;
}
