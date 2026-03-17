import { Injectable } from '@nestjs/common';
import { KeyValueRepositoryPort } from '../../ports/out/firebase/key-value-repository.port';

@Injectable()
export class GetDeviceDataUseCase {
    constructor(private readonly keyValueRepository: KeyValueRepositoryPort) { }

    async getLatest(serial: string): Promise<any> {
        return this.keyValueRepository.getValue(`devices/${serial}/latest`);
    }

    async getHistory(serial: string): Promise<any[]> {
        const history = await this.keyValueRepository.getValue(`devices/${serial}/history`);
        if (!history) return [];

        return Object.values(history);
    }
}
