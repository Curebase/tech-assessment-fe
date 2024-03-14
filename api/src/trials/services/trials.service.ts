import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class TrialsService {
  constructor(private prismaService: PrismaService) {}

  async getTrials(whereInput?: Prisma.TrialWhereInput) {
    return this.prismaService.trial.findMany({ where: whereInput });
  }

  async getParticipants(whereInput?: Prisma.ParticipantWhereInput) {
    return this.prismaService.participant.findMany({ where: whereInput });
  }
}
