import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CreateAccessSchema1710000000000 implements MigrationInterface {
  name = 'CreateAccessSchema1710000000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'organizations',
        columns: [
          { name: 'id', type: 'varchar', isPrimary: true },
          { name: 'name', type: 'varchar', length: '120' },
          { name: 'active', type: 'boolean', default: true },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'user_accounts',
        columns: [
          { name: 'id', type: 'varchar', isPrimary: true },
          { name: 'identity_subject', type: 'varchar', isNullable: false },
          { name: 'organization_id', type: 'varchar' },
          { name: 'active', type: 'boolean', default: true },
        ],
        uniques: [
          new TableUnique({
            name: 'uq_user_accounts_identity_subject',
            columnNames: ['identity_subject'],
          }),
          new TableUnique({
            name: 'uq_user_accounts_id_organization',
            columnNames: ['id', 'organization_id'],
          }),
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'role_assignments',
        columns: [
          { name: 'id', type: 'varchar', isPrimary: true },
          { name: 'account_id', type: 'varchar' },
          { name: 'role', type: 'varchar', length: '32' },
          { name: 'active', type: 'boolean', default: true },
        ],
        uniques: [
          new TableUnique({
            name: 'uq_role_assignments_account_role',
            columnNames: ['account_id', 'role'],
          }),
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          { name: 'id', type: 'varchar', isPrimary: true },
          { name: 'organization_id', type: 'varchar' },
          { name: 'account_id', type: 'varchar', isNullable: true },
          { name: 'manager_employee_id', type: 'varchar', isNullable: true },
          { name: 'active', type: 'boolean', default: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'user_accounts',
      new TableForeignKey({
        name: 'fk_user_accounts_organization',
        columnNames: ['organization_id'],
        referencedTableName: 'organizations',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'role_assignments',
      new TableForeignKey({
        name: 'fk_role_assignments_account',
        columnNames: ['account_id'],
        referencedTableName: 'user_accounts',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        name: 'fk_employees_organization',
        columnNames: ['organization_id'],
        referencedTableName: 'organizations',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        name: 'fk_employees_account_organization',
        columnNames: ['account_id', 'organization_id'],
        referencedTableName: 'user_accounts',
        referencedColumnNames: ['id', 'organization_id'],
      }),
    );
    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        name: 'fk_employees_manager',
        columnNames: ['manager_employee_id'],
        referencedTableName: 'employees',
        referencedColumnNames: ['id'],
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees', true);
    await queryRunner.dropTable('role_assignments', true);
    await queryRunner.dropTable('user_accounts', true);
    await queryRunner.dropTable('organizations', true);
  }
}
