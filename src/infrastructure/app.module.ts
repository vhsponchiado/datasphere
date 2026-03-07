import { Module } from '@nestjs/common';
import { HttpModule } from './modules/http.module';
import { UseCaseModule } from './modules/use-case.module';
import { EnvModule } from './config/env/env.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './modules/auth.module';
import { SecurityModule } from './modules/security.module';

@Module({
  imports: [
    EnvModule,
    LoggerModule,
    SecurityModule,
    AuthModule,
    UseCaseModule,
    HttpModule,
  ],
})
export class AppModule { }
