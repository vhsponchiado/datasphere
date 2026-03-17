import { IsNumber, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeviceDataDto {
    @ApiProperty({ example: 1200, description: 'Rotations per minute' })
    @IsNumber()
    @IsNotEmpty()
    rpm: number;

    @ApiProperty({ example: 75.5, description: 'Temperature in Celsius' })
    @IsNumber()
    @IsNotEmpty()
    temperature: number;

    @ApiProperty({ example: 'on', enum: ['on', 'off', 'operating'], description: 'Device status' })
    @IsEnum(['on', 'off', 'operating'])
    @IsNotEmpty()
    status: 'on' | 'off' | 'operating';

    @ApiProperty({ example: '2026-03-16T20:17:34.000Z', description: 'Creation date', required: false })
    @IsOptional()
    createdAt?: string;
}
