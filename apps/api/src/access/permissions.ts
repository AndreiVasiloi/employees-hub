import type { AccessContext, FixedRole } from './access-context.js';

export type E1Permission =
  | 'profile:read:self'
  | 'workforce:read:direct-reports'
  | 'workforce:read:organization'
  | 'workforce:manage'
  | 'access:manage';

const permissionsByRole: Record<FixedRole, ReadonlySet<E1Permission>> = {
  Employee: new Set(['profile:read:self']),
  Manager: new Set(['profile:read:self', 'workforce:read:direct-reports']),
  HR: new Set([
    'profile:read:self',
    'workforce:read:organization',
    'workforce:manage',
  ]),
  Administrator: new Set([
    'profile:read:self',
    'workforce:read:direct-reports',
    'workforce:read:organization',
    'workforce:manage',
    'access:manage',
  ]),
};

export function hasPermission(
  role: FixedRole,
  permission: E1Permission,
): boolean {
  return permissionsByRole[role].has(permission);
}

export function canAccessOrganization(
  context: AccessContext,
  targetOrganizationId: string,
  permission: E1Permission,
): boolean {
  return (
    context.organizationId === targetOrganizationId &&
    hasPermission(context.role, permission)
  );
}
