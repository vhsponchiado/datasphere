import { Module } from '@nestjs/common';
import { GetValuePort } from '../../application/ports/in/firebase/get-value.port';
import { SetValuePort } from '../../application/ports/in/firebase/set-value.port';
import { GetValueService } from '../../application/services/firebase/get-value.service';
import { SetValueService } from '../../application/services/firebase/set-value.service';
import { KeyValueRepositoryPort } from '../../application/ports/out/firebase/key-value-repository.port';
import { FirebaseKeyValueAdapter } from '../adapters/firebase/firebase-key-value.adapter';

@Module({
    providers: [
        {
            provide: KeyValueRepositoryPort,
            useClass: FirebaseKeyValueAdapter,
        },
        {
            provide: GetValuePort,
            useClass: GetValueService,
        },
        {
            provide: SetValuePort,
            useClass: SetValueService,
        },
    ],
    exports: [GetValuePort, SetValuePort, KeyValueRepositoryPort],
})
export class FirebaseModule { }
