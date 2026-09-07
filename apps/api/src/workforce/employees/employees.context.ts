export interface Employee {
  id: string;
  organizationId: string;
  accountId: string | null;
  teamId: string | null;
  displayName: string;
  managerEmployeeId: string | null;
  active: boolean;
  version: number;
}

export interface CreateEmployeeCommand {
  organizationId: string;
  accountId: string;
  teamId?: string | null;
  displayName: string;
}
export interface UpdateEmployeeCommand {
  id: string;
  organizationId: string;
  teamId?: string | null;
  displayName?: string;
  active?: boolean;
  expectedVersion: number;
}
export interface EmployeeListQuery {
  organizationId: string;
  limit: number;
  offset: number;
}
