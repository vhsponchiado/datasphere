import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  check() {
    return {
      status: 'ok',
      message: 'API is working',
      timestamp: new Date().toISOString(),
    };
  }
}
