import { Injectable } from '@nestjs/common';
import { SetValuePort } from '../../ports/in/firebase/set-value.port';
import { KeyValueRepositoryPort } from '../../ports/out/firebase/key-value-repository.port';

@Injectable()
export class SetValueService extends SetValuePort {
    constructor(private readonly keyValueRepository: KeyValueRepositoryPort) {
        super();
    }

    async execute(key: string, value: any): Promise<void> {
        await this.keyValueRepository.setValue(key, value);
    }
}
