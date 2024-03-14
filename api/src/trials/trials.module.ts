import { Module } from '@nestjs/common';
import { TrialsResolver } from './resolvers/trials.resolver';
import { TrialsService } from './services/trials.service';
import { PrismaService } from 'src/common/prisma.service';
import { DateScalar } from 'src/common/datetimeScalar';

@Module({
  providers: [TrialsResolver, TrialsService, PrismaService, DateScalar],
})
export class TrialsModule {}
