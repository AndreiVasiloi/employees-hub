import type { DataSource, QueryRunner } from 'typeorm';

interface EmployeeRow {
  id: string;
  organization_id: string;
  manager_employee_id: string | null;
  active: boolean;
}

export class EmployeeRelationshipRepository {
  constructor(private readonly dataSource: DataSource) {}

  async assignManager(
    employeeId: string,
    managerEmployeeId: string,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const employee = await this.findEmployee(queryRunner, employeeId);
      const manager = await this.findEmployee(queryRunner, managerEmployeeId);

      if (!employee || !manager) {
        throw new Error('Employee relationship target not found');
      }
      if (employee.id === manager.id) {
        throw new Error('Employee cannot manage itself');
      }
      if (!employee.active || !manager.active) {
        throw new Error('Manager must be active');
      }
      if (employee.organization_id !== manager.organization_id) {
        throw new Error('Manager must belong to the same organization');
      }
      if (employee.manager_employee_id === manager.id) {
        throw new Error('Manager relationship already exists');
      }
      if (await this.wouldCreateCycle(queryRunner, employee.id, manager.id)) {
        throw new Error('Manager relationship would create a cycle');
      }

      await queryRunner.query(
        `UPDATE employees
         SET manager_employee_id = $1
         WHERE id = $2`,
        [manager.id, employee.id],
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async findEmployee(
    queryRunner: QueryRunner,
    employeeId: string,
  ): Promise<EmployeeRow | undefined> {
    const rows: EmployeeRow[] = await queryRunner.query(
      `SELECT id, organization_id, manager_employee_id, active
       FROM employees
       WHERE id = $1
       FOR UPDATE`,
      [employeeId],
    );
    return rows[0];
  }

  private async wouldCreateCycle(
    queryRunner: QueryRunner,
    employeeId: string,
    managerId: string,
  ): Promise<boolean> {
    const visited = new Set<string>();
    let currentId: string | null = managerId;

    while (currentId) {
      if (currentId === employeeId) {
        return true;
      }
      if (visited.has(currentId)) {
        return true;
      }
      visited.add(currentId);
      const current = await this.findEmployee(queryRunner, currentId);
      currentId = current?.manager_employee_id ?? null;
    }
    return false;
  }
}
