import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AuthController } from '../controllers/auth.controller';
import { UseCaseModule } from './use-case.module';
import { AppService } from '../services/app.service';

@Module({
    imports: [UseCaseModule],
    controllers: [AppController, AuthController],
    providers: [AppService],
})
export class HttpModule { }
