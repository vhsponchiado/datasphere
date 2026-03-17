import { Injectable } from '@nestjs/common';
import { KeyValueRepositoryPort } from '../../ports/out/firebase/key-value-repository.port';
import { UpdateDeviceDataDto } from '../../dtos/update-device-data.dto';
import { DeviceData } from '../../../domain/entities/device-data.entity';

@Injectable()
export class UpdateDeviceDataUseCase {
    constructor(private readonly keyValueRepository: KeyValueRepositoryPort) { }

    async execute(serial: string, dto: UpdateDeviceDataDto): Promise<void> {
        const data = new DeviceData({
            createdAt: dto.createdAt || new Date().toISOString(),
            rpm: dto.rpm,
            temperature: dto.temperature,
            status: dto.status,
        });

        const json = data.toJSON();

        await this.keyValueRepository.setValue(`devices/${serial}/latest`, json);

        const historyKey = json.createdAt.replace(/\./g, '_');
        await this.keyValueRepository.setValue(`devices/${serial}/history/${historyKey}`, json);
    }
}
