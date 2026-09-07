import { describe, expect, it, vi } from 'vitest';
import type { DataSource } from 'typeorm';
import { EmployeesService } from './employees.service.js';

const context = {
  accountId: 'actor-001',
  organizationId: 'organization-001',
} as never;

describe('EmployeesService', () => {
  it('emits an audit event when employee creation succeeds', async () => {
    const service = new EmployeesService({
      query: vi.fn().mockResolvedValue([
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
      ]),
    } as unknown as DataSource);

    await service.createEmployee(
      context,
      { accountId: 'account-001', displayName: 'Jane Doe' },
      'correlation-001',
    );

    const audit = (service as unknown as { audit: { events(): unknown[] } })
      .audit;
    expect(audit.events()).toEqual([
      expect.objectContaining({
        actorId: 'actor-001',
        organizationId: 'organization-001',
        targetId: 'employee-001',
        action: 'workforce.employee.create',
        outcome: 'allowed',
        correlationId: 'correlation-001',
      }),
    ]);
  });
});
