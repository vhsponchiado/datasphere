import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  get(key: string): string | undefined {
    return this.configService.get<string>(key);
  }
}
