import { Injectable } from '@nestjs/common';
import { GetValuePort } from '../../ports/in/firebase/get-value.port';
import { KeyValueRepositoryPort } from '../../ports/out/firebase/key-value-repository.port';

@Injectable()
export class GetValueService extends GetValuePort {
    constructor(private readonly keyValueRepository: KeyValueRepositoryPort) {
        super();
    }

    async execute(key: string): Promise<any> {
        return this.keyValueRepository.getValue(key);
    }
}
