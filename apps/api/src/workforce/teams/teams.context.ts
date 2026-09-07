export interface Team {
  id: string;
  organizationId: string;
  name: string;
  active: boolean;
  version: number;
}

export interface CreateTeamCommand {
  organizationId: string;
  name: string;
}

export interface UpdateTeamCommand {
  id: string;
  organizationId: string;
  name?: string;
  active?: boolean;
  expectedVersion: number;
}

export interface TeamListQuery {
  organizationId: string;
  limit: number;
  offset: number;
}
