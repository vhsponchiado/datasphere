import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from '../config/env/env.module';
import { EnvService } from '../config/env/env.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [EnvModule],
            inject: [EnvService],
            useFactory: (envService: EnvService) => ({
                secret: envService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: envService.get('JWT_EXPIRES_IN') as any,
                },
            }),
        }),
    ],
    exports: [JwtModule],
})
export class SecurityModule { }
