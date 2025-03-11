import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
}
