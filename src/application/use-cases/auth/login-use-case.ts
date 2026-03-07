import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SessionRepositoryPort } from '@/application/ports/out/postgres/session-repository.port';
import { EnvService } from '@/infrastructure/config/env/env.service';

export class LoginInput {
    userId: string;
    email: string;
    username: string;
    role: 'user' | 'admin';
}

export class LoginResult {
    accessToken: string;
    refreshToken: string;
}


@Injectable()
export class LoginUseCase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly sessionRepository: SessionRepositoryPort,
        private readonly envService: EnvService,
    ) { }

    async execute(user: LoginInput): Promise<LoginResult> {
        const payload = {
            sub: user.userId,
            email: user.email,
            username: user.username,
            role: user.role,
        };

        const accessToken = await this.jwtService.signAsync(payload);

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.envService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.envService.get('JWT_REFRESH_EXPIRES_IN') as any,
        });

        const expiresAt = new Date();
        const refreshExpiresIn = this.envService.get('JWT_REFRESH_EXPIRES_IN') || '7d';
        const days = parseInt(refreshExpiresIn.replace('d', ''));
        expiresAt.setDate(expiresAt.getDate() + days);

        await this.sessionRepository.create({
            userId: user.userId,
            refreshToken,
            expiresAt,
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}