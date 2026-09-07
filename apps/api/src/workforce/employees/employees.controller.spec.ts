import { describe, expect, it, vi } from 'vitest';
import { OptimisticLockError } from '../../common/optimistic-lock.error.js';
import { EmployeesController } from './employees.controller.js';
import type { EmployeesService } from './employees.service.js';

const headers = () => ({
  'x-identity-subject': 'fictional-hr-001',
  'x-identity-issued-at': '2026-01-01T00:00:00.000Z',
  'x-identity-expires-at': '2027-01-01T00:00:00.000Z',
  'x-correlation-id': 'correlation-001',
});

const controller = (service: Partial<EmployeesService>) =>
  new EmployeesController(service as EmployeesService);

describe('EmployeesController', () => {
  it('scopes employee lists and caps pagination', async () => {
    const listEmployees = vi.fn().mockResolvedValue([]);
    await controller({ listEmployees }).listEmployees('99', '2', headers());
    expect(listEmployees).toHaveBeenCalledWith(
      expect.objectContaining({ organizationId: 'organization-001' }),
      expect.objectContaining({
        organizationId: 'organization-001',
        limit: 50,
        offset: 2,
      }),
    );
  });

  it('maps optimistic conflicts to HTTP 409', async () => {
    await expect(
      controller({
        updateEmployee: vi.fn().mockRejectedValue(new OptimisticLockError()),
      }).updateEmployee('employee-001', { expectedVersion: 0 }, headers()),
    ).rejects.toMatchObject({ status: 409 });
  });

  it('delegates manager assignment through the protected boundary', async () => {
    const assignManager = vi.fn().mockResolvedValue({
      id: 'employee-001',
      managerEmployeeId: 'employee-002',
    });
    await controller({ assignManager }).assignManager(
      'employee-001',
      { managerEmployeeId: 'employee-002' },
      headers(),
    );
    expect(assignManager).toHaveBeenCalledWith(
      expect.objectContaining({ organizationId: 'organization-001' }),
      'employee-001',
      'employee-002',
      'correlation-001',
    );
  });

  it('creates employees from HR context without accepting organization input', async () => {
    const createEmployee = vi.fn().mockResolvedValue({ id: 'employee-001' });
    await controller({ createEmployee }).createEmployee(
      { accountId: 'account-001', teamId: 'team-001', displayName: 'Jane Doe' },
      headers(),
    );
    expect(createEmployee).toHaveBeenCalledWith(
      expect.objectContaining({ organizationId: 'organization-001' }),
      { accountId: 'account-001', teamId: 'team-001', displayName: 'Jane Doe' },
      'correlation-001',
    );
  });

  it('returns employees only from the resolved organization', async () => {
    const getEmployee = vi.fn().mockResolvedValue({ id: 'employee-001' });
    await controller({ getEmployee }).getEmployee('employee-001', headers());
    expect(getEmployee).toHaveBeenCalledWith(
      expect.objectContaining({ organizationId: 'organization-001' }),
      'employee-001',
    );
  });

  it('returns a safe 404 for an employee outside the resolved organization', async () => {
    await expect(
      controller({
        getEmployee: vi.fn().mockResolvedValue(undefined),
      }).getEmployee('employee-other', headers()),
    ).rejects.toMatchObject({ status: 404 });
  });

  it('updates employee activation and team through the protected boundary', async () => {
    const updateEmployee = vi.fn().mockResolvedValue({ version: 1 });
    await controller({ updateEmployee }).updateEmployee(
      'employee-001',
      { teamId: 'team-002', active: false, expectedVersion: 0 },
      headers(),
    );
    expect(updateEmployee).toHaveBeenCalledWith(
      expect.objectContaining({ organizationId: 'organization-001' }),
      'employee-001',
      { teamId: 'team-002', active: false, expectedVersion: 0 },
      'correlation-001',
    );
  });

  it('denies employee mutations to a non-HR identity', async () => {
    const createEmployee = vi.fn();
    await expect(
      controller({ createEmployee }).createEmployee(
        { accountId: 'account-001', displayName: 'Jane Doe' },
        { ...headers(), 'x-identity-subject': 'fictional-employee-001' },
      ),
    ).rejects.toMatchObject({ status: 403 });
    expect(createEmployee).not.toHaveBeenCalled();
  });
});
