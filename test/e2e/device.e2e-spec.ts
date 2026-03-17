import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/infrastructure/app.module';

describe('DeviceController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    const serial = 'prototipo_01';
    const apiKey = 'datasphere-dev-key';

    it('/devices/:serial/data (POST) should update device data', async () => {
        const now = new Date();
        const promises: any[] = [];
        // Simulate 7 days (168 hours)
        for (let i = 168; i >= 0; i--) {
            const createdAt = new Date(now.getTime() - i * 60 * 60 * 1000).toISOString();

            // Cycle status every 3 hours
            let status: 'on' | 'off' | 'operating' = 'on';
            if (i % 3 === 1) status = 'operating';
            if (i % 3 === 2) status = 'off';

            const payload = {
                rpm: status === 'off' ? 0 : 1000 + Math.random() * 500,
                temperature: status === 'off' ? 25 : 60 + Math.random() * 20,
                status,
                createdAt,
            };

            promises.push(
                request(app.getHttpServer())
                    .post(`/devices/${serial}/data`)
                    .set('x-api-key', apiKey)
                    .send(payload)
            );
        }
        await Promise.all(promises);
    }, 60000);

    it('/devices/:serial/latest (GET) should retrieve latest data', async () => {
        const response = await request(app.getHttpServer())
            .get(`/devices/${serial}/latest`)
            .set('x-api-key', apiKey);

        expect(response.status).toBe(200);
        if (response.body) {
            expect(response.body).toHaveProperty('rpm');
            expect(response.body).toHaveProperty('temperature');
            expect(response.body).toHaveProperty('status');
            expect(response.body).toHaveProperty('createdAt');
        }
    });

    it('/devices/:serial/dashboard (GET) should retrieve dashboard analytics', async () => {
        const response = await request(app.getHttpServer())
            .get(`/devices/${serial}/dashboard`)
            .set('x-api-key', apiKey);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('currentRpm');
        expect(response.body).toHaveProperty('totalHoursOn');
        expect(response.body).toHaveProperty('totalHoursOperating');
        expect(response.body).toHaveProperty('rpmVsTemp24h');
        expect(response.body).toHaveProperty('weeklyStateStats');

        expect(Array.isArray(response.body.rpmVsTemp24h)).toBe(true);
        expect(Array.isArray(response.body.weeklyStateStats)).toBe(true);
        expect(response.body.weeklyStateStats.length).toBe(7);
    });
});
