import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '@/infrastructure/guards/jwt-auth.guard';
import { AdminAuthGuard } from '@/infrastructure/guards/admin-auth.guard';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Guards', () => {
    describe('JwtAuthGuard', () => {
        let guard: JwtAuthGuard;

        beforeEach(() => {
            guard = new JwtAuthGuard();
        });

        it('should be defined', () => {
            expect(guard).toBeDefined();
        });
    });

    describe('AdminAuthGuard', () => {
        let guard: AdminAuthGuard;

        beforeEach(() => {
            guard = new AdminAuthGuard();
        });

        it('should allow access for admin role', async () => {
            const context = {
                switchToHttp: () => ({
                    getRequest: () => ({
                        user: { role: 'admin' },
                    }),
                }),
            } as unknown as ExecutionContext;

            // Mocking super.canActivate which returns true (already authenticated)
            vi.spyOn(JwtAuthGuard.prototype, 'canActivate').mockResolvedValue(true);

            const result = await guard.canActivate(context);
            expect(result).toBe(true);
        });

        it('should throw ForbiddenException for non-admin role', async () => {
            const context = {
                switchToHttp: () => ({
                    getRequest: () => ({
                        user: { role: 'user' },
                    }),
                }),
            } as unknown as ExecutionContext;

            vi.spyOn(JwtAuthGuard.prototype, 'canActivate').mockResolvedValue(true);

            await expect(guard.canActivate(context)).rejects.toThrow(ForbiddenException);
        });

        it('should return false if super.canActivate returns false', async () => {
            const context = {} as unknown as ExecutionContext;
            vi.spyOn(JwtAuthGuard.prototype, 'canActivate').mockResolvedValue(false);

            const result = await guard.canActivate(context);
            expect(result).toBe(false);
        });
    });
});
