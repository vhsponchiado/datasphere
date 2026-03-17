import { ApiProperty } from '@nestjs/swagger';

export class DeviceLatestResponseDto {
    @ApiProperty({ example: 1250.5, description: 'Current RPM' })
    rpm: number;

    @ApiProperty({ example: 72.3, description: 'Current temperature in Celsius' })
    temperature: number;

    @ApiProperty({ example: 'operating', enum: ['on', 'off', 'operating'] })
    status: string;

    @ApiProperty({ example: '2026-03-16T21:30:00.000Z' })
    createdAt: string;
}

export class RpmVsTempPointDto {
    @ApiProperty({ example: 1200 })
    rpm: number;

    @ApiProperty({ example: 70.5 })
    temperature: number;

    @ApiProperty({ example: '2026-03-16T21:30:00.000Z' })
    time: string;
}

export class WeeklyStateStatDto {
    @ApiProperty({ example: '2026-03-16' })
    date: string;

    @ApiProperty({ example: 8.5, description: 'Hours in ON state' })
    on: number;

    @ApiProperty({ example: 12.0, description: 'Hours in OFF state' })
    off: number;

    @ApiProperty({ example: 3.5, description: 'Hours in OPERATING state' })
    operating: number;
}

export class DeviceDashboardResponseDto {
    @ApiProperty({ example: 1250.5 })
    currentRpm: number;

    @ApiProperty({ example: 72.3 })
    currentTemperature: number;

    @ApiProperty({ example: 'operating' })
    currentStatus: string;

    @ApiProperty({ example: 120.5, description: 'Cumulative hours in ON state' })
    totalHoursOn: number;

    @ApiProperty({ example: 500.2, description: 'Cumulative hours in OFF state' })
    totalHoursOff: number;

    @ApiProperty({ example: 45.8, description: 'Cumulative hours in OPERATING state' })
    totalHoursOperating: number;

    @ApiProperty({ type: [RpmVsTempPointDto] })
    rpmVsTemp24h: RpmVsTempPointDto[];

    @ApiProperty({ type: [WeeklyStateStatDto] })
    weeklyStateStats: WeeklyStateStatDto[];
}
