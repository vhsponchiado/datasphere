import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { UpdateDeviceDataUseCase } from '../../application/use-cases/firebase/update-device-data.use-case';
import { GetDeviceDataUseCase } from '../../application/use-cases/firebase/get-device-data.use-case';
import { GetDeviceDashboardUseCase } from '../../application/use-cases/firebase/get-device-dashboard.use-case';
import { UpdateDeviceDataDto } from '../../application/dtos/update-device-data.dto';
import {
    DeviceLatestResponseDto,
    DeviceDashboardResponseDto
} from '../../application/dtos/device-response.dto';
import { ApiKeyGuard } from '../guards/api-key.guard';

@ApiTags('devices')
@ApiHeader({
    name: 'x-api-key',
    description: 'API key for device authentication',
    required: true,
})
@UseGuards(ApiKeyGuard)
@Controller('devices')
export class DeviceController {
    constructor(
        private readonly updateDeviceData: UpdateDeviceDataUseCase,
        private readonly getDeviceData: GetDeviceDataUseCase,
        private readonly getDeviceDashboard: GetDeviceDashboardUseCase,
    ) { }

    @Post(':serial/data')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update device sensor data (latest and history)' })
    @ApiResponse({ status: 200, description: 'Data updated successfully' })
    async updateData(
        @Param('serial') serial: string,
        @Body() dto: UpdateDeviceDataDto,
    ): Promise<void> {
        await this.updateDeviceData.execute(serial, dto);
    }

    @Get(':serial/latest')
    @ApiOperation({ summary: 'Get latest sensor data for a device' })
    @ApiResponse({ status: 200, description: 'Latest data retrieved successfully', type: DeviceLatestResponseDto })
    async getLatest(@Param('serial') serial: string): Promise<DeviceLatestResponseDto> {
        return this.getDeviceData.getLatest(serial);
    }

    @Get(':serial/history')
    @ApiOperation({ summary: 'Get sensor data history for a device' })
    @ApiResponse({ status: 200, description: 'History retrieved successfully', type: [DeviceLatestResponseDto] })
    async getHistory(@Param('serial') serial: string): Promise<DeviceLatestResponseDto[]> {
        return this.getDeviceData.getHistory(serial);
    }

    @Get(':serial/dashboard')
    @ApiOperation({ summary: 'Get device dashboard analytics' })
    @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully', type: DeviceDashboardResponseDto })
    async getDashboard(@Param('serial') serial: string): Promise<DeviceDashboardResponseDto> {
        return this.getDeviceDashboard.execute(serial);
    }
}
