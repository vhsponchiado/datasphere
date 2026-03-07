import { Module } from '@nestjs/common';
import { LoginUseCase } from '@/application/use-cases/auth/login-use-case';
import { LogoutUseCase } from '@/application/use-cases/auth/logout-use-case';
import { RefreshTokensUseCase } from '@/application/use-cases/auth/refresh-tokens.use-case';
import { ValidateUserUseCase } from '@/application/use-cases/auth/validate-user.use-case';
import { PostgresModule } from '../db/postgres/postgres.module';
import { SecurityModule } from './security.module';

@Module({
    imports: [PostgresModule, SecurityModule],
    providers: [
        LoginUseCase,
        LogoutUseCase,
        RefreshTokensUseCase,
        ValidateUserUseCase,
    ],
    exports: [
        LoginUseCase,
        LogoutUseCase,
        RefreshTokensUseCase,
        ValidateUserUseCase,
    ],
})
export class UseCaseModule { }
