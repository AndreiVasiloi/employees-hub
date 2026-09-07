import { describe, expect, it } from 'vitest';
import { OptimisticLockError } from '../common/optimistic-lock.error.js';
import { AccessRequestExecutor } from './access-request.executor.js';

const headers = (subject = 'fictional-hr-001') => ({
  'x-identity-subject': subject,
  'x-identity-issued-at': '2026-01-01T00:00:00.000Z',
  'x-identity-expires-at': '2027-01-01T00:00:00.000Z',
  'x-correlation-id': 'correlation-001',
});

describe('AccessRequestExecutor', () => {
  it('derives organization scope from the resolved HR identity', async () => {
    const executor = new AccessRequestExecutor();
    await expect(
      executor.execute(headers(), 'workforce:manage', async (context) => ({
        organizationId: context.organizationId,
      })),
    ).resolves.toEqual({ organizationId: 'organization-001' });
  });

  it('denies workforce mutation to an employee identity', async () => {
    const executor = new AccessRequestExecutor();
    await expect(
      executor.execute(
        headers('fictional-employee-001'),
        'workforce:manage',
        async () => 'unexpected',
      ),
    ).rejects.toMatchObject({ status: 403 });
  });

  it('rejects incomplete identity headers safely', async () => {
    const executor = new AccessRequestExecutor();
    await expect(
      executor.execute(
        {},
        'workforce:read:organization',
        async () => 'unexpected',
      ),
    ).rejects.toMatchObject({ status: 401 });
  });

  it('maps optimistic-lock errors to HTTP 409 with correlation id', async () => {
    const executor = new AccessRequestExecutor();
    await expect(
      executor.execute(headers(), 'workforce:manage', async () => {
        throw new OptimisticLockError();
      }),
    ).rejects.toMatchObject({ status: 409 });
  });
});
