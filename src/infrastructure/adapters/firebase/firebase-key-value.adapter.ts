import { Injectable } from '@nestjs/common';
import { ref, get, set, push } from "firebase/database";
import { db } from '../../config/firebase/firebase.config';
import { KeyValueRepositoryPort } from '../../../application/ports/out/firebase/key-value-repository.port';

@Injectable()
export class FirebaseKeyValueAdapter implements KeyValueRepositoryPort {
    async getValue(key: string): Promise<any> {
        if (!db) return null;
        const dbRef = ref(db, key);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            return snapshot.val();
        }
        return null;
    }

    async setValue(key: string, value: any): Promise<void> {
        if (!db) return;
        const dbRef = ref(db, key);
        await set(dbRef, value);
    }

    async pushValue(key: string, value: any): Promise<void> {
        if (!db) return;
        const dbRef = ref(db, key);
        await push(dbRef, value);
    }
}
