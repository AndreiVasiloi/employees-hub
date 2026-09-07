import { describe, expect, it, vi } from 'vitest';
import type { DataSource } from 'typeorm';
import { TeamsService } from './teams.service.js';

describe('TeamsService', () => {
  it('emits an audit event when team update succeeds', async () => {
    const service = new TeamsService({
      query: vi.fn().mockResolvedValue([
        {
          id: 'team-001',
          organization_id: 'organization-001',
          name: 'People',
          active: false,
          version: 1,
        },
      ]),
    } as unknown as DataSource);

    await service.updateTeam(
      { accountId: 'actor-001', organizationId: 'organization-001' } as never,
      'team-001',
      { active: false, expectedVersion: 0 },
      'correlation-001',
    );

    const audit = (service as unknown as { audit: { events(): unknown[] } })
      .audit;
    expect(audit.events()).toEqual([
      expect.objectContaining({
        actorId: 'actor-001',
        organizationId: 'organization-001',
        targetId: 'team-001',
        action: 'workforce.team.update',
        outcome: 'allowed',
        correlationId: 'correlation-001',
      }),
    ]);
  });
});
