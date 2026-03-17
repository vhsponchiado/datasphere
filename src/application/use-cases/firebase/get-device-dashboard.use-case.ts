import { Injectable } from '@nestjs/common';
import { KeyValueRepositoryPort } from '../../ports/out/firebase/key-value-repository.port';

export interface DashboardResponse {
    currentRpm: number;
    currentTemperature: number;
    currentStatus: string;
    totalHoursOn: number;
    totalHoursOff: number;
    totalHoursOperating: number;
    rpmVsTemp24h: { rpm: number; temperature: number; time: string }[];
    weeklyStateStats: { date: string; on: number; off: number; operating: number }[];
}

@Injectable()
export class GetDeviceDashboardUseCase {
    constructor(private readonly keyValueRepository: KeyValueRepositoryPort) { }

    async execute(serial: string): Promise<DashboardResponse> {
        const [latest, historyObj] = await Promise.all([
            this.keyValueRepository.getValue(`devices/${serial}/latest`),
            this.keyValueRepository.getValue(`devices/${serial}/history`),
        ]);

        const history = historyObj ? Object.values(historyObj).sort((a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ) : [];

        // Calculate hours (simple interval-based estimation)
        let totalHoursOn = 0;
        let totalHoursOff = 0;
        let totalHoursOperating = 0;

        for (let i = 0; i < history.length - 1; i++) {
            const current = history[i] as any;
            const next = history[i + 1] as any;
            const durationHours = (new Date(next.createdAt).getTime() - new Date(current.createdAt).getTime()) / (1000 * 60 * 60);

            if (current.status === 'on') totalHoursOn += durationHours;
            else if (current.status === 'off') totalHoursOff += durationHours;
            else if (current.status === 'operating') totalHoursOperating += durationHours;
        }

        // RPM vs Temp 24h
        const now = new Date();
        const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const rpmVsTemp24h = history
            .filter((h: any) => new Date(h.createdAt) >= last24h)
            .map((h: any) => ({
                rpm: h.rpm,
                temperature: h.temperature,
                time: h.createdAt,
            }));

        // Weekly State Stats
        const weeklyStateStats: any[] = [];
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        last7Days.forEach(date => {
            const dayData = history.filter((h: any) => h.createdAt.startsWith(date));
            let on = 0, off = 0, operating = 0;

            for (let i = 0; i < dayData.length - 1; i++) {
                const current = dayData[i] as any;
                const next = dayData[i + 1] as any;
                const duration = (new Date(next.createdAt).getTime() - new Date(current.createdAt).getTime()) / (1000 * 60 * 60);
                if (current.status === 'on') on += duration;
                else if (current.status === 'off') off += duration;
                else if (current.status === 'operating') operating += duration;
            }

            weeklyStateStats.push({ date, on, off, operating });
        });

        return {
            currentRpm: latest?.rpm || 0,
            currentTemperature: latest?.temperature || 0,
            currentStatus: latest?.status || 'off',
            totalHoursOn: Math.round(totalHoursOn * 10) / 10,
            totalHoursOff: Math.round(totalHoursOff * 10) / 10,
            totalHoursOperating: Math.round(totalHoursOperating * 10) / 10,
            rpmVsTemp24h,
            weeklyStateStats,
        };
    }
}
