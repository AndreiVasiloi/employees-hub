import { Injectable } from '@nestjs/common';
import type { AccessContext } from '../../access/access-context.js';
import { InMemoryAuditPort, type AuditPort } from '../../access/audit.port.js';
import {
  createAuthorizationAuditEvent,
  type AuthorizationAuditEvent,
} from '../../access/security-evidence.js';
import { DataSource } from 'typeorm';
import type { TeamListQuery, UpdateTeamCommand } from './teams.context.js';
import { PostgresTeamRepository } from './teams.repository.js';

@Injectable()
export class TeamsService {
  private readonly repository: PostgresTeamRepository;
  private readonly audit: AuditPort = new InMemoryAuditPort();

  constructor(dataSource: DataSource) {
    this.repository = new PostgresTeamRepository(dataSource);
  }

  createTeam(context: AccessContext, name: string, correlationId: string) {
    this.requireName(name);
    return this.auditMutation(
      context,
      'workforce.team.create',
      correlationId,
      this.repository.createTeam({
        organizationId: context.organizationId,
        name,
      }),
    );
  }

  listTeams(context: AccessContext, query: TeamListQuery) {
    return this.repository.listTeams({
      ...query,
      organizationId: context.organizationId,
    });
  }
  getTeam(context: AccessContext, id: string) {
    return this.repository.getTeam(id, context.organizationId);
  }

  updateTeam(
    context: AccessContext,
    id: string,
    command: Omit<UpdateTeamCommand, 'id' | 'organizationId'>,
    correlationId: string,
  ) {
    if (command.name !== undefined) this.requireName(command.name);
    return this.auditMutation(
      context,
      'workforce.team.update',
      correlationId,
      this.repository.updateTeam({
        ...command,
        id,
        organizationId: context.organizationId,
      }),
    );
  }

  private async auditMutation<T extends { id: string }>(
    context: AccessContext,
    action: string,
    correlationId: string,
    operation: Promise<T>,
  ): Promise<T> {
    const result = await operation;
    const event: AuthorizationAuditEvent = createAuthorizationAuditEvent({
      actorId: context.accountId,
      organizationId: context.organizationId,
      action,
      targetId: result.id,
      outcome: 'allowed',
      correlationId,
      occurredAt: new Date(),
    });
    this.audit.emit(event);
    return result;
  }

  private requireName(name: string) {
    if (!name.trim() || name.length > 120)
      throw new Error('Name must be 1 to 120 characters');
  }
}
