import { randomUUID } from 'node:crypto';
import type { DataSource } from 'typeorm';
import { OptimisticLockError } from '../../common/optimistic-lock.error.js';
import type {
  CreateEmployeeCommand,
  Employee,
  EmployeeListQuery,
  UpdateEmployeeCommand,
} from './employees.context.js';

interface EmployeeRow {
  id: string;
  organization_id: string;
  account_id: string | null;
  team_id: string | null;
  display_name: string;
  manager_employee_id: string | null;
  active: boolean;
  version: number;
}
type Queryable = Pick<DataSource, 'query'>;

export class PostgresEmployeeRepository {
  constructor(private readonly dataSource: Queryable) {}

  async createEmployee(command: CreateEmployeeCommand): Promise<Employee> {
    const rows: EmployeeRow[] = await this.dataSource.query(
      `INSERT INTO employees (id, organization_id, account_id, team_id, display_name, active, version)
       SELECT $1, account.organization_id, account.id, team.id, $3, true, 0
       FROM user_accounts account LEFT JOIN teams team ON team.id = $2
       AND team.organization_id = account.organization_id AND team.active = true
       WHERE account.id = $4 AND account.organization_id = $5 AND account.active = true
       AND ($2::varchar IS NULL OR team.id IS NOT NULL)
       RETURNING id, organization_id, account_id, team_id, display_name, manager_employee_id, active, version`,
      [
        randomUUID(),
        command.teamId ?? null,
        command.displayName,
        command.accountId,
        command.organizationId,
      ],
    );
    if (!rows[0]) throw new Error('Employee account or team is not available');
    return this.toEmployee(rows[0]);
  }

  async getEmployee(
    id: string,
    organizationId: string,
  ): Promise<Employee | undefined> {
    const rows: EmployeeRow[] = await this.dataSource.query(
      `SELECT id, organization_id, account_id, team_id, display_name, manager_employee_id, active, version
       FROM employees WHERE id = $1 AND organization_id = $2`,
      [id, organizationId],
    );
    return rows[0] ? this.toEmployee(rows[0]) : undefined;
  }

  async listEmployees(query: EmployeeListQuery): Promise<Employee[]> {
    const page = this.page(query);
    const rows: EmployeeRow[] = await this.dataSource.query(
      `SELECT id, organization_id, account_id, team_id, display_name, manager_employee_id, active, version
       FROM employees WHERE organization_id = $1 ORDER BY display_name, id LIMIT $2 OFFSET $3`,
      [query.organizationId, page.limit, page.offset],
    );
    return rows.map((row) => this.toEmployee(row));
  }

  async updateEmployee(command: UpdateEmployeeCommand): Promise<Employee> {
    const hasTeamUpdate = command.teamId !== undefined;
    const rows: EmployeeRow[] = await this.dataSource.query(
      `UPDATE employees SET team_id = CASE WHEN $1 THEN $2 ELSE team_id END,
       display_name = COALESCE($3, display_name), active = COALESCE($4, active), version = version + 1
       WHERE id = $5 AND organization_id = $6 AND version = $7 AND (
         NOT $1 OR $2::varchar IS NULL OR EXISTS (SELECT 1 FROM teams WHERE id = $2 AND organization_id = $6 AND active = true)
       ) RETURNING id, organization_id, account_id, team_id, display_name, manager_employee_id, active, version`,
      [
        hasTeamUpdate,
        command.teamId ?? null,
        command.displayName ?? null,
        command.active ?? null,
        command.id,
        command.organizationId,
        command.expectedVersion,
      ],
    );
    if (!rows[0]) throw new OptimisticLockError();
    return this.toEmployee(rows[0]);
  }

  private toEmployee(row: EmployeeRow): Employee {
    return {
      id: row.id,
      organizationId: row.organization_id,
      accountId: row.account_id,
      teamId: row.team_id,
      displayName: row.display_name,
      managerEmployeeId: row.manager_employee_id,
      active: row.active,
      version: row.version,
    };
  }

  private page(
    query: EmployeeListQuery,
  ): Pick<EmployeeListQuery, 'limit' | 'offset'> {
    if (
      !Number.isInteger(query.limit) ||
      !Number.isInteger(query.offset) ||
      query.limit < 1 ||
      query.offset < 0
    )
      throw new Error('Invalid pagination');
    return { limit: Math.min(query.limit, 50), offset: query.offset };
  }
}
