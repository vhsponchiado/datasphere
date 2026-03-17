import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { EnvService } from '@/infrastructure/config/env/env.service'
import * as schema from './drizzle.schema'

@Injectable()
export class DrizzleClient implements OnModuleDestroy {
  private readonly logger = new Logger(DrizzleClient.name)
  private readonly pool: Pool
  private readonly db: ReturnType<typeof drizzle>

  constructor(private readonly envService: EnvService) {
    const sslEnabled = this.envService.get('POSTGRES_SSL')?.toLowerCase() === 'true';
    const sslConfig = sslEnabled
      ? {
        rejectUnauthorized: false,
      }
      : undefined;

    const database = this.envService.get('POSTGRES_DB')!;
    const port = Number.parseInt(this.envService.get('POSTGRES_PORT') || '5432', 10);
    const user = this.envService.get('POSTGRES_USER')!;
    const password = this.envService.get('POSTGRES_PASSWORD')!;
    const host = this.envService.get('POSTGRES_HOST')!;

    this.pool = new Pool({
      host,
      port,
      user,
      password,
      database,
      ssl: sslConfig,
    });

    this.db = drizzle(this.pool, { schema });

    this.logger.log('Drizzle client initialized');
  }

  getDb() {
    return this.db
  }

  getPool() {
    return this.pool
  }

  async onModuleDestroy() {
    await this.pool.end()
    this.logger.log('Database connection pool closed')
  }
}