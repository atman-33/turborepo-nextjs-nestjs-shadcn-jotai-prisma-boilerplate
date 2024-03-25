import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get databaseUrl(): string {
    return this.configService.get('DATABASE_URL');
  }

  get apiPort(): number {
    return this.configService.get('API_PORT');
  }

  get productionOrigin(): string {
    return this.configService.get('PRODUCTION_ORIGIN');
  }
}
