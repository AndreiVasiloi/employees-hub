import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AccessRequestExecutor } from '../../access/access-request.executor.js';
import { EmployeesService } from './employees.service.js';

@Controller('api/v1/workforce/employees')
export class EmployeesController {
  private readonly requests = new AccessRequestExecutor();
  constructor(private readonly service: EmployeesService) {}

  @Post()
  createEmployee(
    @Body()
    body: { accountId: string; teamId?: string | null; displayName: string },
    @Headers() headers: Record<string, string | undefined>,
  ) {
    return this.requests.execute(
      headers,
      'workforce:manage',
      (context, correlationId) =>
        this.service.createEmployee(context, body, correlationId),
    );
  }

  @Get()
  listEmployees(
    @Query('limit') limit: string | undefined,
    @Query('offset') offset: string | undefined,
    @Headers() headers: Record<string, string | undefined>,
  ) {
    return this.requests.execute(
      headers,
      'workforce:read:organization',
      (context) =>
        this.service.listEmployees(
          context,
          this.requests.page(context.organizationId, limit, offset),
        ),
    );
  }

  @Get(':id')
  getEmployee(
    @Param('id') id: string,
    @Headers() headers: Record<string, string | undefined>,
  ) {
    return this.requests.execute(
      headers,
      'workforce:read:organization',
      async (context) =>
        this.requests.required(await this.service.getEmployee(context, id)),
    );
  }

  @Patch(':id')
  updateEmployee(
    @Param('id') id: string,
    @Body()
    body: {
      teamId?: string | null;
      displayName?: string;
      active?: boolean;
      expectedVersion: number;
    },
    @Headers() headers: Record<string, string | undefined>,
  ) {
    return this.requests.execute(
      headers,
      'workforce:manage',
      (context, correlationId) =>
        this.service.updateEmployee(context, id, body, correlationId),
    );
  }

  @Post(':id/manager')
  assignManager(
    @Param('id') id: string,
    @Body() body: { managerEmployeeId: string },
    @Headers() headers: Record<string, string | undefined>,
  ) {
    return this.requests.execute(
      headers,
      'workforce:manage',
      (context, correlationId) =>
        this.service.assignManager(
          context,
          id,
          body.managerEmployeeId,
          correlationId,
        ),
    );
  }
}
