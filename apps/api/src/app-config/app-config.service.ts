import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get service() {
    return this.configService;
  }

  get nodeEnv(): string {
    return this.configService.get('NODE_ENV');
  }

  get databaseUrl(): string {
    return this.configService.get('DATABASE_URL');
  }
}
