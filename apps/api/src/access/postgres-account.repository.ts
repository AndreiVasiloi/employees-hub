import type { DataSource } from 'typeorm';
import type { AccountRepository, FixedRole, LinkedAccount } from './access-context.js';

const fixedRoles: FixedRole[] = [
  'Employee',
  'Manager',
  'HR',
  'Administrator',
];

interface AccountRow {
  account_id: string;
  identity_subject: string;
  organization_id: string;
  role: string;
  employee_id: string | null;
  manager_employee_id: string | null;
  account_active: boolean;
  role_active: boolean;
  employee_active: boolean | null;
}

export class PostgresAccountRepository implements AccountRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findByIdentitySubject(
    subject: string,
  ): Promise<LinkedAccount | undefined> {
    const rows: AccountRow[] = await this.dataSource.query(
      `SELECT ua.id AS account_id,
              ua.identity_subject,
              ua.organization_id,
              ra.role,
              e.id AS employee_id,
              e.manager_employee_id,
              ua.active AS account_active,
              ra.active AS role_active,
              e.active AS employee_active
       FROM user_accounts ua
       JOIN role_assignments ra ON ra.account_id = ua.id
       LEFT JOIN employees e ON e.account_id = ua.id
       WHERE ua.identity_subject = $1
       ORDER BY ra.id
       LIMIT 1`,
      [subject],
    );
    const row = rows[0];

    if (
      !row ||
      !row.account_active ||
      !row.role_active ||
      (row.employee_id && !row.employee_active) ||
      !fixedRoles.includes(row.role as FixedRole)
    ) {
      return undefined;
    }

    return {
      id: row.account_id,
      identitySubject: row.identity_subject,
      organizationId: row.organization_id,
      role: row.role as FixedRole,
      employeeId: row.employee_id,
      managerEmployeeId: row.manager_employee_id,
      active: true,
    };
  }
}
