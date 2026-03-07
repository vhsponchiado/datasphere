import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { UseCaseModule } from './use-case.module';
import { SecurityModule } from './security.module';

@Module({
    imports: [
        PassportModule,
        SecurityModule,
        UseCaseModule,
    ],
    providers: [JwtStrategy, LocalStrategy],
    exports: [JwtStrategy, LocalStrategy],
})
export class AuthModule { }
