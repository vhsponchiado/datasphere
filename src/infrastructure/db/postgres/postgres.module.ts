import { Module } from '@nestjs/common';
import { SessionRepositoryPort } from '@/application/ports/out/postgres/session-repository.port';
import { UserRepositoryPort } from '@/application/ports/out/postgres/user-repository.port';
import { EnvModule } from '@/infrastructure/config/env/env.module';
import { DrizzleClient } from './drizzle.client';
import { DrizzleSessionRepository } from '../../adapters/postgres/repositories/session-repository.adapter';
import { DrizzleUserRepository } from '../../adapters/postgres/repositories/user-repository.adapter';

@Module({
  imports: [EnvModule],
  providers: [
    DrizzleClient,
    {
      provide: UserRepositoryPort,
      useClass: DrizzleUserRepository,
    },
    {
      provide: SessionRepositoryPort,
      useClass: DrizzleSessionRepository,
    },
  ],
  exports: [
    DrizzleClient,
    UserRepositoryPort,
    SessionRepositoryPort,
  ],
})
export class PostgresModule { }