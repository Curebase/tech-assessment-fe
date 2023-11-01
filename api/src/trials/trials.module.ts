import { Module } from '@nestjs/common';
import { TrialsResolver } from './resolvers/trials.resolver';
import { TrialsService } from './services/trials.service';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  providers: [TrialsResolver, TrialsService, PrismaService],
})
export class TrialsModule {}
