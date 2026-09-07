import { describe, expect, it, vi } from 'vitest';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';
import { CreateAccessSchema1710000000000 } from '../database/migrations/1710000000000-CreateAccessSchema.js';
import { CreateWorkforceSchema1710000000001 } from '../database/migrations/1710000000001-CreateWorkforceSchema.js';
import { PostgresEmployeeRepository } from './employees/employees.repository.js';
import { PostgresTeamRepository } from './teams/teams.repository.js';
import { OptimisticLockError } from '../common/optimistic-lock.error.js';

describe('Workforce repositories', () => {
  it('createEmployee_createsEmployeeWithTeam', async () => {
    // Given an active account and team in the same organization
    const query = vi.fn().mockResolvedValue([
      {
        id: 'employee-001',
        organization_id: 'organization-001',
        account_id: 'account-001',
        team_id: 'team-001',
        display_name: 'Jane Doe',
        manager_employee_id: null,
        active: true,
        version: 0,
      },
    ]);
    const repository = new PostgresEmployeeRepository({ query });

    // When createEmployee is called with valid command
    const employee = await repository.createEmployee({
      organizationId: 'organization-001',
      accountId: 'account-001',
      teamId: 'team-001',
      displayName: 'Jane Doe',
    });

    // Then a new employee row is returned with teamId set
    expect(employee).toEqual({
      id: 'employee-001',
      organizationId: 'organization-001',
      accountId: 'account-001',
      teamId: 'team-001',
      displayName: 'Jane Doe',
      managerEmployeeId: null,
      active: true,
      version: 0,
    });
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO employees'),
      expect.arrayContaining([
        'team-001',
        'Jane Doe',
        'account-001',
        'organization-001',
      ]),
    );
  });

  it('createEmployee_rejectsAccountFromOtherOrganization', async () => {
    // Given a command referencing an account in another organization
    const query = vi.fn().mockResolvedValue([]);
    const repository = new PostgresEmployeeRepository({ query });

    // When createEmployee is called
    const create = repository.createEmployee({
      organizationId: 'organization-001',
      accountId: 'account-from-organization-002',
      displayName: 'Jane Doe',
    });

    // Then it throws a safe validation error without exposing account details
    await expect(create).rejects.toThrow(
      'Employee account or team is not available',
    );
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('account.organization_id = $5'),
      expect.arrayContaining(['organization-001']),
    );
  });

  it('createEmployee_rejectsInactiveAccount', async () => {
    // Given a command referencing an inactive user account
    const query = vi.fn().mockResolvedValue([]);
    const repository = new PostgresEmployeeRepository({ query });

    // When createEmployee is called
    const create = repository.createEmployee({
      organizationId: 'organization-001',
      accountId: 'inactive-account-001',
      displayName: 'Jane Doe',
    });

    // Then it throws a safe validation error
    await expect(create).rejects.toThrow(
      'Employee account or team is not available',
    );
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('account.active = true'),
      expect.any(Array),
    );
  });

  it('createEmployee_rejectsTeamFromOtherOrganization', async () => {
    // Given a command with an optional team from another organization
    const query = vi.fn().mockResolvedValue([]);
    const repository = new PostgresEmployeeRepository({ query });

    // When createEmployee is called
    const create = repository.createEmployee({
      organizationId: 'organization-001',
      accountId: 'account-001',
      teamId: 'team-from-organization-002',
      displayName: 'Jane Doe',
    });

    // Then it throws a safe validation error
    await expect(create).rejects.toThrow(
      'Employee account or team is not available',
    );
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('team.organization_id = account.organization_id'),
      expect.any(Array),
    );
  });

  it('getEmployee_returnsEmployeeByIdAndOrganization', async () => {
    // Given an existing employee in the caller's organization
    const query = vi.fn().mockResolvedValue([
      {
        id: 'employee-001',
        organization_id: 'organization-001',
        account_id: 'account-001',
        team_id: null,
        display_name: 'Jane Doe',
        manager_employee_id: null,
        active: true,
        version: 0,
      },
    ]);
    const repository = new PostgresEmployeeRepository({ query });

    // When getEmployee is called with that id and organization
    const employee = await repository.getEmployee(
      'employee-001',
      'organization-001',
    );

    // Then the employee is returned
    expect(employee).toMatchObject({
      id: 'employee-001',
      organizationId: 'organization-001',
      displayName: 'Jane Doe',
    });
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('WHERE id = $1 AND organization_id = $2'),
      ['employee-001', 'organization-001'],
    );
  });

  it('getEmployee_returnsUndefinedForWrongOrganization', async () => {
    // Given an existing employee in another organization
    const query = vi.fn().mockResolvedValue([]);
    const repository = new PostgresEmployeeRepository({ query });

    // When getEmployee is called with the caller's organization id
    const employee = await repository.getEmployee(
      'employee-002',
      'organization-001',
    );

    // Then undefined is returned
    expect(employee).toBeUndefined();
  });

  it('listEmployees_returnsPagedOrganizationScopedResults', async () => {
    // Given multiple employees in the caller's organization and others
    const query = vi.fn().mockResolvedValue([
      {
        id: 'employee-001',
        organization_id: 'organization-001',
        account_id: 'account-001',
        team_id: null,
        display_name: 'Jane Doe',
        manager_employee_id: null,
        active: true,
        version: 0,
      },
    ]);
    const repository = new PostgresEmployeeRepository({ query });

    // When listEmployees is called with limit and offset
    const employees = await repository.listEmployees({
      organizationId: 'organization-001',
      limit: 10,
      offset: 5,
    });

    // Then only the caller's employees are returned in the requested page
    expect(employees).toHaveLength(1);
    expect(employees[0]?.organizationId).toBe('organization-001');
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('WHERE organization_id = $1'),
      ['organization-001', 10, 5],
    );
  });

  it('listEmployees_capsLimitAtFifty', async () => {
    // Given a request with limit greater than 50
    const query = vi.fn().mockResolvedValue([]);
    const repository = new PostgresEmployeeRepository({ query });

    // When listEmployees is called
    await repository.listEmployees({
      organizationId: 'organization-001',
      limit: 99,
      offset: 0,
    });

    // Then results are capped at 50
    expect(query).toHaveBeenCalledWith(expect.any(String), [
      'organization-001',
      50,
      0,
    ]);
    await expect(
      repository.listEmployees({
        organizationId: 'organization-001',
        limit: 1,
        offset: -1,
      }),
    ).rejects.toThrow('Invalid pagination');
  });

  it('updateEmployee_updatesDisplayNameAndTeam', async () => {
    // Given an existing employee and a valid expectedVersion
    const query = vi.fn().mockResolvedValue([
      {
        id: 'employee-001',
        organization_id: 'organization-001',
        account_id: 'account-001',
        team_id: 'team-002',
        display_name: 'Jane Smith',
        manager_employee_id: null,
        active: true,
        version: 1,
      },
    ]);
    const repository = new PostgresEmployeeRepository({ query });

    // When updateEmployee changes displayName and teamId
    const employee = await repository.updateEmployee({
      id: 'employee-001',
      organizationId: 'organization-001',
      displayName: 'Jane Smith',
      teamId: 'team-002',
      expectedVersion: 0,
    });

    // Then the updated employee is returned with an incremented version
    expect(employee).toMatchObject({
      displayName: 'Jane Smith',
      teamId: 'team-002',
      version: 1,
    });
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('version = version + 1'),
      expect.arrayContaining(['employee-001', 'organization-001', 0]),
    );
  });

  it('updateEmployee_throwsOnStaleVersion', async () => {
    // Given an existing employee with version 1
    const repository = new PostgresEmployeeRepository({
      query: vi.fn().mockResolvedValue([]),
    });

    // When updateEmployee is called with expectedVersion 0
    const update = repository.updateEmployee({
      id: 'employee-001',
      organizationId: 'organization-001',
      expectedVersion: 0,
    });

    // Then it throws a conflict error
    await expect(update).rejects.toEqual(new OptimisticLockError());
  });

  it('updateEmployee_incrementsVersion', async () => {
    // Given an existing employee with version 0
    const repository = new PostgresEmployeeRepository({
      query: vi.fn().mockResolvedValue([
        {
          id: 'employee-001',
          organization_id: 'organization-001',
          account_id: 'account-001',
          team_id: null,
          display_name: 'Jane Doe',
          manager_employee_id: null,
          active: true,
          version: 1,
        },
      ]),
    });

    // When updateEmployee succeeds
    const employee = await repository.updateEmployee({
      id: 'employee-001',
      organizationId: 'organization-001',
      active: false,
      expectedVersion: 0,
    });

    // Then the returned employee has version 1
    expect(employee.version).toBe(1);
  });

  it('createTeam_createsTeamInOrganization', async () => {
    // Given a unique team name in the organization
    const query = vi.fn().mockResolvedValue([
      {
        id: 'team-001',
        organization_id: 'organization-001',
        name: 'People Operations',
        active: true,
        version: 0,
      },
    ]);
    const repository = new PostgresTeamRepository({ query });

    // When createTeam is called
    const team = await repository.createTeam({
      organizationId: 'organization-001',
      name: 'People Operations',
    });

    // Then a new team row is returned with version 0
    expect(team).toEqual({
      id: 'team-001',
      organizationId: 'organization-001',
      name: 'People Operations',
      active: true,
      version: 0,
    });
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO teams'),
      expect.arrayContaining(['organization-001', 'People Operations']),
    );
  });

  it('createTeam_rejectsDuplicateName', async () => {
    // Given an existing team with the same name in the organization
    const repository = new PostgresTeamRepository({
      query: vi.fn().mockRejectedValue({ code: '23505' }),
    });

    // When createTeam is called with that name
    const create = repository.createTeam({
      organizationId: 'organization-001',
      name: 'People Operations',
    });

    // Then it throws a duplicate error
    await expect(create).rejects.toThrow('Team name already exists');
  });

  it('getTeam_returnsTeamByIdAndOrganization', async () => {
    // Given an existing team in the caller's organization
    const query = vi.fn().mockResolvedValue([
      {
        id: 'team-001',
        organization_id: 'organization-001',
        name: 'People Operations',
        active: true,
        version: 0,
      },
    ]);
    const repository = new PostgresTeamRepository({ query });

    // When getTeam is called with that id and organization
    const team = await repository.getTeam('team-001', 'organization-001');

    // Then the team is returned
    expect(team).toEqual({
      id: 'team-001',
      organizationId: 'organization-001',
      name: 'People Operations',
      active: true,
      version: 0,
    });
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('WHERE id = $1 AND organization_id = $2'),
      ['team-001', 'organization-001'],
    );
  });

  it('listTeams_returnsPagedOrganizationScopedResults', async () => {
    // Given multiple teams across organizations
    const query = vi.fn().mockResolvedValue([
      {
        id: 'team-002',
        organization_id: 'organization-001',
        name: 'People Operations',
        active: true,
        version: 0,
      },
    ]);
    const repository = new PostgresTeamRepository({ query });

    // When listTeams is called
    const teams = await repository.listTeams({
      organizationId: 'organization-001',
      limit: 10,
      offset: 5,
    });

    // Then only the caller's teams are returned paginated
    expect(teams).toEqual([
      {
        id: 'team-002',
        organizationId: 'organization-001',
        name: 'People Operations',
        active: true,
        version: 0,
      },
    ]);
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('WHERE organization_id = $1'),
      ['organization-001', 10, 5],
    );
  });

  it('updateTeam_updatesNameAndActive', async () => {
    // Given an existing team and valid expectedVersion
    const query = vi.fn().mockResolvedValue([
      {
        id: 'team-001',
        organization_id: 'organization-001',
        name: 'People Experience',
        active: false,
        version: 1,
      },
    ]);
    const repository = new PostgresTeamRepository({ query });

    // When updateTeam changes name and active flag
    const team = await repository.updateTeam({
      id: 'team-001',
      organizationId: 'organization-001',
      name: 'People Experience',
      active: false,
      expectedVersion: 0,
    });

    // Then the updated team is returned with an incremented version
    expect(team).toEqual({
      id: 'team-001',
      organizationId: 'organization-001',
      name: 'People Experience',
      active: false,
      version: 1,
    });
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('version = version + 1'),
      ['People Experience', false, 'team-001', 'organization-001', 0],
    );
  });

  it('updateTeam_throwsOnStaleVersion', async () => {
    // Given an existing team with version 1
    const query = vi.fn().mockResolvedValue([]);
    const repository = new PostgresTeamRepository({ query });

    // When updateTeam is called with expectedVersion 0
    const update = repository.updateTeam({
      id: 'team-001',
      organizationId: 'organization-001',
      name: 'People Operations',
      expectedVersion: 0,
    });

    // Then it throws a conflict error
    await expect(update).rejects.toEqual(new OptimisticLockError());
  });
});

describe.skip('TeamsController legacy scaffold (replaced by teams.controller.spec.ts)', () => {
  it('POST /api/v1/workforce/teams creates a team for HR/Administrator', () => {
    // Given an HR identity with workforce:manage
    // When POST /api/v1/workforce/teams is called
    // Then 201 with version 0 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('POST /api/v1/workforce/teams rejects Employee/Manager', () => {
    // Given an Employee identity
    // When POST /api/v1/workforce/teams is called
    // Then 403 ACCESS_DENIED is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('GET /api/v1/workforce/teams lists teams for readers', () => {
    // Given an HR identity with workforce:read:organization
    // When GET /api/v1/workforce/teams is called
    // Then 200 with paginated teams is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('GET /api/v1/workforce/teams/:id returns team for same organization', () => {
    // Given an existing team in the caller's organization
    // When GET /api/v1/workforce/teams/:id is called
    // Then 200 with the team is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('GET /api/v1/workforce/teams/:id returns 404 for other organization', () => {
    // Given an existing team in another organization
    // When GET /api/v1/workforce/teams/:id is called
    // Then 404 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('PATCH /api/v1/workforce/teams/:id updates name and version', () => {
    // Given an existing team and valid expectedVersion
    // When PATCH is called with a new name
    // Then 200 with incremented version is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('PATCH /api/v1/workforce/teams/:id returns 409 on stale version', () => {
    // Given an existing team with version 1
    // When PATCH is called with expectedVersion 0
    // Then 409 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('PATCH /api/v1/workforce/teams/:id deactivation does not cascade to employees', () => {
    // Given a team with employees
    // When PATCH deactivates the team
    // Then employees remain active with the same teamId
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });
});

describe.skip('EmployeesController legacy scaffold (replaced by employees.controller.spec.ts)', () => {
  it('POST /api/v1/workforce/employees creates an employee', () => {
    // Given an HR identity and an active account in the same org
    // When POST /api/v1/workforce/employees is called
    // Then 201 with version 0 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('POST /api/v1/workforce/employees rejects inactive account', () => {
    // Given a command with an inactive account
    // When POST /api/v1/workforce/employees is called
    // Then 400 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('POST /api/v1/workforce/employees rejects cross-org account', () => {
    // Given a command with an account from another organization
    // When POST is called
    // Then 400 is returned without leaking existence
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('POST /api/v1/workforce/employees rejects cross-org team', () => {
    // Given a command with a team from another organization
    // When POST is called
    // Then 400 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('GET /api/v1/workforce/employees lists employees for readers', () => {
    // Given an HR identity
    // When GET /api/v1/workforce/employees is called
    // Then 200 with paginated employees is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('GET /api/v1/workforce/employees/:id returns employee for same org', () => {
    // Given an existing employee in the caller's org
    // When GET /api/v1/workforce/employees/:id is called
    // Then 200 with the employee is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('GET /api/v1/workforce/employees/:id returns 404 for other org', () => {
    // Given an existing employee in another organization
    // When GET is called
    // Then 404 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('PATCH /api/v1/workforce/employees/:id updates displayName and team', () => {
    // Given an existing employee and valid expectedVersion
    // When PATCH is called
    // Then 200 with incremented version is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('PATCH /api/v1/workforce/employees/:id returns 409 on stale version', () => {
    // Given an existing employee with version 1
    // When PATCH is called with expectedVersion 0
    // Then 409 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('PATCH /api/v1/workforce/employees/:id deactivates and reactivates', () => {
    // Given an existing employee
    // When PATCH toggles active with valid versions
    // Then 200 with toggled active and incremented version is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });
});

describe.skip('Employee reporting-line legacy scaffold (replaced by employees.controller.spec.ts)', () => {
  it('POST /api/v1/workforce/employees/:id/manager assigns a manager', () => {
    // Given two employees in the same org
    // When the manager endpoint is called
    // Then 200 with managerEmployeeId set is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('POST /api/v1/workforce/employees/:id/manager rejects self', () => {
    // Given an employee id and the same manager id
    // When the manager endpoint is called
    // Then 400 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('POST /api/v1/workforce/employees/:id/manager rejects duplicate manager', () => {
    // Given an employee already managed by the requested manager
    // When the endpoint is called
    // Then 400 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('POST /api/v1/workforce/employees/:id/manager rejects inactive manager', () => {
    // Given an inactive manager
    // When the endpoint is called
    // Then 400 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('POST /api/v1/workforce/employees/:id/manager rejects cross-org manager', () => {
    // Given a manager in another organization
    // When the endpoint is called
    // Then 400 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('POST /api/v1/workforce/employees/:id/manager rejects cyclic chain', () => {
    // Given employees A and B where B already reports to A
    // When A is assigned to report to B
    // Then 400 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('POST /api/v1/workforce/employees/:id/manager reassigns to different manager', () => {
    // Given an employee with an existing manager
    // When a different manager is assigned
    // Then 200 with the new managerEmployeeId is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });
});

describe.skip('Workforce authorization legacy scaffold (replaced by feature-level specs)', () => {
  it('enforces fixed role permission matrix on every endpoint', () => {
    // Given identities with Employee, Manager, HR, Administrator roles
    // When each endpoint is called without the required permission
    // Then 403 is returned
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('derives organization scope from AccessContext, not request body', () => {
    // Given a valid HR identity
    // When a request is made without an organizationId body field
    // Then the operation is scoped by the server-side AccessContext
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('does not leak cross-organization existence', () => {
    // Given a resource in another organization
    // When an unauthorized or cross-org read is attempted
    // Then 404 or 403 is returned with no internal details
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('emits audit event for every successful mutation', () => {
    // Given an HR identity and a successful create/update/manager request
    // When the operation completes
    // Then a structured AuditPort event is emitted
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });

  it('audit events exclude secrets and internal details', () => {
    // Given an operation that produces an audit event
    // When the event is inspected
    // Then no stack traces, tokens, or DB details are present
    expect(true, 'Test skeleton - not implemented').toBe(false);
  });
});

describe('Migrations', () => {
  it('applies access and workforce schemas sequentially on a clean database', () => {
    // Given a fresh PostgreSQL container
    // When DataSource.initialize runs with migrationsRun true
    // Then both migrations apply and all tables/columns are present
    return new PostgreSqlContainer('postgres:18.6-alpine')
      .start()
      .then(async (container) => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: container.getHost(),
          port: container.getPort(),
          username: container.getUsername(),
          password: container.getPassword(),
          database: container.getDatabase(),
          synchronize: false,
          migrations: [
            CreateAccessSchema1710000000000,
            CreateWorkforceSchema1710000000001,
          ],
        });

        try {
          await dataSource.initialize();
          await dataSource.runMigrations();

          const tables: Array<{ table_name: string }> = await dataSource.query(
            `SELECT table_name
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name IN ('organizations', 'user_accounts', 'role_assignments', 'employees', 'teams')
             ORDER BY table_name`,
          );

          expect(tables.map(({ table_name }) => table_name)).toEqual([
            'employees',
            'organizations',
            'role_assignments',
            'teams',
            'user_accounts',
          ]);

          const employeeColumns: Array<{ column_name: string }> =
            await dataSource.query(
              `SELECT column_name
               FROM information_schema.columns
               WHERE table_schema = 'public'
                 AND table_name = 'employees'
                 AND column_name IN ('id', 'organization_id', 'account_id', 'manager_employee_id', 'team_id', 'display_name', 'version', 'active')
               ORDER BY column_name`,
            );

          expect(employeeColumns.map(({ column_name }) => column_name)).toEqual(
            [
              'account_id',
              'active',
              'display_name',
              'id',
              'manager_employee_id',
              'organization_id',
              'team_id',
              'version',
            ],
          );
        } finally {
          await dataSource.destroy();
          await container.stop();
        }
      });
  }, 60_000);
});
