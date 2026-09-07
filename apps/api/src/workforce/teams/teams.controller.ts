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
import { TeamsService } from './teams.service.js';

@Controller('api/v1/workforce/teams')
export class TeamsController {
  private readonly requests = new AccessRequestExecutor();
  constructor(private readonly service: TeamsService) {}

  @Post()
  createTeam(
    @Body() body: { name: string },
    @Headers() headers: Record<string, string | undefined>,
  ) {
    return this.requests.execute(
      headers,
      'workforce:manage',
      (context, correlationId) =>
        this.service.createTeam(context, body.name, correlationId),
    );
  }

  @Get()
  listTeams(
    @Query('limit') limit: string | undefined,
    @Query('offset') offset: string | undefined,
    @Headers() headers: Record<string, string | undefined>,
  ) {
    return this.requests.execute(
      headers,
      'workforce:read:organization',
      (context) =>
        this.service.listTeams(
          context,
          this.requests.page(context.organizationId, limit, offset),
        ),
    );
  }

  @Get(':id')
  getTeam(
    @Param('id') id: string,
    @Headers() headers: Record<string, string | undefined>,
  ) {
    return this.requests.execute(
      headers,
      'workforce:read:organization',
      async (context) =>
        this.requests.required(await this.service.getTeam(context, id)),
    );
  }

  @Patch(':id')
  updateTeam(
    @Param('id') id: string,
    @Body() body: { name?: string; active?: boolean; expectedVersion: number },
    @Headers() headers: Record<string, string | undefined>,
  ) {
    return this.requests.execute(
      headers,
      'workforce:manage',
      (context, correlationId) =>
        this.service.updateTeam(context, id, body, correlationId),
    );
  }
}
