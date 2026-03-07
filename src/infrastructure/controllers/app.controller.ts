import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from '../services/app.service';

@ApiTags('system')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('health')
  @ApiOperation({ summary: 'Check API status' })
  @ApiResponse({
    status: 200,
    description: 'API is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        message: { type: 'string', example: 'API is working' },
        timestamp: { type: 'string', example: '2024-03-02T20:30:00.000Z' },
      },
    },
  })
  check() {
    return this.appService.check();
  }
}
