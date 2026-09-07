import { Injectable } from '@nestjs/common';
import type { AccessContext } from '../../access/access-context.js';
import { InMemoryAuditPort, type AuditPort } from '../../access/audit.port.js';
import { EmployeeRelationshipRepository } from '../../access/employee-relationship.repository.js';
import {
  createAuthorizationAuditEvent,
  type AuthorizationAuditEvent,
} from '../../access/security-evidence.js';
import { DataSource } from 'typeorm';
import type {
  CreateEmployeeCommand,
  EmployeeListQuery,
  UpdateEmployeeCommand,
} from './employees.context.js';
import { PostgresEmployeeRepository } from './employees.repository.js';

@Injectable()
export class EmployeesService {
  private readonly repository: PostgresEmployeeRepository;
  private readonly relationships: EmployeeRelationshipRepository;
  private readonly audit: AuditPort = new InMemoryAuditPort();

  constructor(dataSource: DataSource) {
    this.repository = new PostgresEmployeeRepository(dataSource);
    this.relationships = new EmployeeRelationshipRepository(dataSource);
  }

  createEmployee(
    context: AccessContext,
    command: Omit<CreateEmployeeCommand, 'organizationId'>,
    correlationId: string,
  ) {
    this.requireName(command.displayName);
    return this.auditMutation(
      context,
      'workforce.employee.create',
      correlationId,
      this.repository.createEmployee({
        ...command,
        organizationId: context.organizationId,
      }),
    );
  }

  listEmployees(context: AccessContext, query: EmployeeListQuery) {
    return this.repository.listEmployees({
      ...query,
      organizationId: context.organizationId,
    });
  }
  getEmployee(context: AccessContext, id: string) {
    return this.repository.getEmployee(id, context.organizationId);
  }

  updateEmployee(
    context: AccessContext,
    id: string,
    command: Omit<UpdateEmployeeCommand, 'id' | 'organizationId'>,
    correlationId: string,
  ) {
    if (command.displayName !== undefined)
      this.requireName(command.displayName);
    return this.auditMutation(
      context,
      'workforce.employee.update',
      correlationId,
      this.repository.updateEmployee({
        ...command,
        id,
        organizationId: context.organizationId,
      }),
    );
  }

  async assignManager(
    context: AccessContext,
    employeeId: string,
    managerEmployeeId: string,
    correlationId: string,
  ) {
    await this.relationships.assignManager(employeeId, managerEmployeeId);
    const employee = await this.repository.getEmployee(
      employeeId,
      context.organizationId,
    );
    if (!employee) throw new Error('Employee not found');
    this.emitAudit(
      context,
      'workforce.employee.assign-manager',
      employeeId,
      correlationId,
    );
    return employee;
  }

  private async auditMutation<T extends { id: string }>(
    context: AccessContext,
    action: string,
    correlationId: string,
    operation: Promise<T>,
  ): Promise<T> {
    const result = await operation;
    this.emitAudit(context, action, result.id, correlationId);
    return result;
  }
  private emitAudit(
    context: AccessContext,
    action: string,
    targetId: string,
    correlationId: string,
  ) {
    const event: AuthorizationAuditEvent = createAuthorizationAuditEvent({
      actorId: context.accountId,
      organizationId: context.organizationId,
      action,
      targetId,
      outcome: 'allowed',
      correlationId,
      occurredAt: new Date(),
    });
    this.audit.emit(event);
  }
  private requireName(name: string) {
    if (!name.trim() || name.length > 120)
      throw new Error('Name must be 1 to 120 characters');
  }
}
