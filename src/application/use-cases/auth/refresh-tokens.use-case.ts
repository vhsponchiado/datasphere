import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SessionRepositoryPort } from '@/application/ports/out/postgres/session-repository.port';
import { EnvService } from '@/infrastructure/config/env/env.service';

export interface RefreshTokensResult {
    accessToken: string;
    refreshToken: string;
}

@Injectable()
export class RefreshTokensUseCase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly sessionRepository: SessionRepositoryPort,
        private readonly envService: EnvService,
    ) { }

    async execute(oldRefreshToken: string): Promise<RefreshTokensResult> {
        const session = await this.sessionRepository.findByRefreshToken(oldRefreshToken);

        if (!session) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        if (new Date() > session.expiresAt) {
            await this.sessionRepository.deleteByRefreshToken(oldRefreshToken);
            throw new UnauthorizedException('Refresh token expired');
        }

        let payload: any;
        try {
            payload = this.jwtService.verify(oldRefreshToken, {
                secret: this.envService.get('JWT_REFRESH_SECRET'),
            });
        } catch (error) {
            await this.sessionRepository.deleteByRefreshToken(oldRefreshToken);
            throw new UnauthorizedException('Invalid refresh token');
        }

        const newAccessToken = await this.jwtService.signAsync({
            sub: payload.sub,
            email: payload.email,
            username: payload.username,
            role: payload.role,
        });

        const newRefreshToken = await this.jwtService.signAsync(
            {
                sub: payload.sub,
                email: payload.email,
                username: payload.username,
                role: payload.role,
            },
            {
                secret: this.envService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.envService.get('JWT_REFRESH_EXPIRES_IN') as any,
            },
        );

        const expiresAt = new Date();
        const refreshExpiresIn = this.envService.get('JWT_REFRESH_EXPIRES_IN') || '7d';
        const days = parseInt(refreshExpiresIn.replace('d', ''));
        expiresAt.setDate(expiresAt.getDate() + days);

        await this.sessionRepository.deleteByRefreshToken(oldRefreshToken);
        await this.sessionRepository.create({
            userId: payload.sub,
            refreshToken: newRefreshToken,
            expiresAt,
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
}