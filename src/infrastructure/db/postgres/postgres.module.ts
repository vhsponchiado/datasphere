import { Module } from '@nestjs/common';
import { SessionRepositoryPort } from '@/application/ports/out/postgres/session-repository.port';
import { UserRepositoryPort } from '@/application/ports/out/postgres/user-repository.port';
import { EnvModule } from '@/infrastructure/config/env/env.module';
import { DrizzleClientAdapter } from './drizzle-client-adapter';
import { DrizzleSessionRepository } from './repositories/session-repository.adapter';
import { DrizzleUserRepository } from './repositories/user-repository.adapter';

@Module({
  imports: [EnvModule],
  providers: [
    DrizzleClientAdapter,
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
    DrizzleClientAdapter,
    UserRepositoryPort,
    SessionRepositoryPort,
  ],
})
export class PostgresModule { }