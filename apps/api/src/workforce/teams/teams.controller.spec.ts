import { describe, expect, it, vi } from 'vitest';
import { TeamsController } from './teams.controller.js';
import type { TeamsService } from './teams.service.js';

const headers = (subject = 'fictional-hr-001') => ({
  'x-identity-subject': subject,
  'x-identity-issued-at': '2026-01-01T00:00:00.000Z',
  'x-identity-expires-at': '2027-01-01T00:00:00.000Z',
  'x-correlation-id': 'correlation-001',
});

const controller = (service: Partial<TeamsService>) =>
  new TeamsController(service as TeamsService);

describe('TeamsController', () => {
  it('creates teams from HR context', async () => {
    const createTeam = vi
      .fn()
      .mockResolvedValue({ id: 'team-001', version: 0 });
    await expect(
      controller({ createTeam }).createTeam({ name: 'People' }, headers()),
    ).resolves.toEqual({ id: 'team-001', version: 0 });
    expect(createTeam).toHaveBeenCalledWith(
      expect.objectContaining({ organizationId: 'organization-001' }),
      'People',
      'correlation-001',
    );
  });

  it('denies workforce mutations to employees', async () => {
    const createTeam = vi.fn();
    await expect(
      controller({ createTeam }).createTeam(
        { name: 'People' },
        headers('fictional-employee-001'),
      ),
    ).rejects.toMatchObject({ status: 403 });
    expect(createTeam).not.toHaveBeenCalled();
  });

  it('returns safe 404 responses for scoped absences', async () => {
    await expect(
      controller({ getTeam: vi.fn().mockResolvedValue(undefined) }).getTeam(
        'team-other',
        headers(),
      ),
    ).rejects.toMatchObject({ status: 404 });
  });
});
