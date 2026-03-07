import { Injectable } from '@nestjs/common';
import { SessionRepositoryPort } from '@/application/ports/out/postgres/session-repository.port';

@Injectable()
export class LogoutUseCase {
    constructor(
        private readonly sessionRepository: SessionRepositoryPort,
    ) { }

    async execute(userId: string): Promise<void> {
        await this.sessionRepository.deleteByUserId(userId);
    }
}