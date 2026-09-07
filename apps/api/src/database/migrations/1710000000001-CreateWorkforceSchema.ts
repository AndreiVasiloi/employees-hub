import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CreateWorkforceSchema1710000000001 implements MigrationInterface {
  name = 'CreateWorkforceSchema1710000000001';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teams',
        columns: [
          { name: 'id', type: 'varchar', isPrimary: true },
          { name: 'organization_id', type: 'varchar' },
          { name: 'name', type: 'varchar', length: '120' },
          { name: 'active', type: 'boolean', default: true },
          { name: 'version', type: 'integer', default: 0 },
        ],
        uniques: [
          new TableUnique({
            name: 'uq_teams_organization_name',
            columnNames: ['organization_id', 'name'],
          }),
          new TableUnique({
            name: 'uq_teams_id_organization',
            columnNames: ['id', 'organization_id'],
          }),
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'teams',
      new TableForeignKey({
        name: 'fk_teams_organization',
        columnNames: ['organization_id'],
        referencedTableName: 'organizations',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.addColumns('employees', [
      new TableColumn({
        name: 'team_id',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'display_name',
        type: 'varchar',
        length: '120',
        isNullable: false,
        default: "''",
      }),
      new TableColumn({
        name: 'version',
        type: 'integer',
        default: 0,
      }),
    ]);

    await queryRunner.createUniqueConstraint(
      'employees',
      new TableUnique({
        name: 'uq_employees_id_organization',
        columnNames: ['id', 'organization_id'],
      }),
    );

    await queryRunner.dropForeignKey('employees', 'fk_employees_manager');

    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        name: 'fk_employees_manager',
        columnNames: ['manager_employee_id', 'organization_id'],
        referencedTableName: 'employees',
        referencedColumnNames: ['id', 'organization_id'],
      }),
    );

    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        name: 'fk_employees_team',
        columnNames: ['team_id', 'organization_id'],
        referencedTableName: 'teams',
        referencedColumnNames: ['id', 'organization_id'],
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('employees', 'fk_employees_team');

    const table = await queryRunner.getTable('employees');
    const managerFk = table?.foreignKeys.find(
      (foreignKey) =>
        foreignKey.columnNames.length === 2 &&
        foreignKey.columnNames.includes('manager_employee_id') &&
        foreignKey.columnNames.includes('organization_id'),
    );
    if (managerFk) {
      await queryRunner.dropForeignKey('employees', managerFk);
    }

    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        name: 'fk_employees_manager',
        columnNames: ['manager_employee_id'],
        referencedTableName: 'employees',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.dropUniqueConstraint(
      'employees',
      'uq_employees_id_organization',
    );

    await queryRunner.dropColumns('employees', [
      'team_id',
      'display_name',
      'version',
    ]);

    await queryRunner.dropTable('teams', true);
  }
}
