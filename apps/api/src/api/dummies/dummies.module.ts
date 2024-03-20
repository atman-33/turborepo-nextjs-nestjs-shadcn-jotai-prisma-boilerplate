import { Module } from '@nestjs/common';
import { PrismaModule } from '@repo/api-data-access-db';
import { DummiesResolver } from './dummies.resolver';
import { DummiesService } from './dummies.service';

@Module({
  providers: [DummiesResolver, DummiesService],
  imports: [PrismaModule],
})
export class DummiesModule {}
