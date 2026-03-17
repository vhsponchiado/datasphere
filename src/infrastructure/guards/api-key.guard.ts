import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { EnvService } from '../config/env/env.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private readonly envService: EnvService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];

        const expectedApiKey = this.envService.get('DEVICE_API_KEY');

        if (!apiKey || apiKey !== expectedApiKey) {
            throw new UnauthorizedException('Invalid or missing API Key');
        }

        return true;
    }
}
