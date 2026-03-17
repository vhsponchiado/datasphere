import { Module } from '@nestjs/common';
import { DeviceController } from '../controllers/device.controller';
import { UpdateDeviceDataUseCase } from '../../application/use-cases/firebase/update-device-data.use-case';
import { GetDeviceDataUseCase } from '../../application/use-cases/firebase/get-device-data.use-case';
import { GetDeviceDashboardUseCase } from '../../application/use-cases/firebase/get-device-dashboard.use-case';
import { FirebaseModule } from './firebase.module';

@Module({
    imports: [FirebaseModule],
    controllers: [DeviceController],
    providers: [UpdateDeviceDataUseCase, GetDeviceDataUseCase, GetDeviceDashboardUseCase],
})
export class DeviceModule { }
