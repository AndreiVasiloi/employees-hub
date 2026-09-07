import { randomUUID } from 'node:crypto';
import type { DataSource } from 'typeorm';
import { OptimisticLockError } from '../../common/optimistic-lock.error.js';
import type {
  CreateTeamCommand,
  Team,
  TeamListQuery,
  UpdateTeamCommand,
} from './teams.context.js';

interface TeamRow {
  id: string;
  organization_id: string;
  name: string;
  active: boolean;
  version: number;
}
type Queryable = Pick<DataSource, 'query'>;

export class PostgresTeamRepository {
  constructor(private readonly dataSource: Queryable) {}

  async createTeam(command: CreateTeamCommand): Promise<Team> {
    try {
      const rows: TeamRow[] = await this.dataSource.query(
        `INSERT INTO teams (id, organization_id, name, active, version)
         VALUES ($1, $2, $3, true, 0)
         RETURNING id, organization_id, name, active, version`,
        [randomUUID(), command.organizationId, command.name],
      );
      return this.toTeam(rows[0]);
    } catch (error) {
      if (this.isUniqueViolation(error))
        throw new Error('Team name already exists');
      throw error;
    }
  }

  async getTeam(id: string, organizationId: string): Promise<Team | undefined> {
    const rows: TeamRow[] = await this.dataSource.query(
      `SELECT id, organization_id, name, active, version FROM teams
       WHERE id = $1 AND organization_id = $2`,
      [id, organizationId],
    );
    return rows[0] ? this.toTeam(rows[0]) : undefined;
  }

  async listTeams(query: TeamListQuery): Promise<Team[]> {
    const page = this.page(query);
    const rows: TeamRow[] = await this.dataSource.query(
      `SELECT id, organization_id, name, active, version FROM teams
       WHERE organization_id = $1 ORDER BY name, id LIMIT $2 OFFSET $3`,
      [query.organizationId, page.limit, page.offset],
    );
    return rows.map((row) => this.toTeam(row));
  }

  async updateTeam(command: UpdateTeamCommand): Promise<Team> {
    const rows: TeamRow[] = await this.dataSource.query(
      `UPDATE teams SET name = COALESCE($1, name), active = COALESCE($2, active),
       version = version + 1 WHERE id = $3 AND organization_id = $4 AND version = $5
       RETURNING id, organization_id, name, active, version`,
      [
        command.name ?? null,
        command.active ?? null,
        command.id,
        command.organizationId,
        command.expectedVersion,
      ],
    );
    if (!rows[0]) throw new OptimisticLockError();
    return this.toTeam(rows[0]);
  }

  private toTeam(row: TeamRow | undefined): Team {
    if (!row) throw new Error('Team creation failed');
    return {
      id: row.id,
      organizationId: row.organization_id,
      name: row.name,
      active: row.active,
      version: row.version,
    };
  }

  private page(query: TeamListQuery): Pick<TeamListQuery, 'limit' | 'offset'> {
    if (
      !Number.isInteger(query.limit) ||
      !Number.isInteger(query.offset) ||
      query.limit < 1 ||
      query.offset < 0
    )
      throw new Error('Invalid pagination');
    return { limit: Math.min(query.limit, 50), offset: query.offset };
  }

  private isUniqueViolation(error: unknown): error is { code: string } {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: unknown }).code === '23505'
    );
  }
}
