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
});
