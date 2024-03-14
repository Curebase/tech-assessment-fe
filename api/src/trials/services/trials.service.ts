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

  async getParticipant(participantId: number) {
    return this.prismaService.participant.findUnique({
      where: {
        id: participantId,
      },
    });
  }

  async createParticipant(
    participantInfo: Prisma.ParticipantCreateInput,
    trialId: string | null,
  ) {
    const newParticipant = await this.prismaService.participant.create({
      data: participantInfo,
    });
    if (trialId) {
      this.prismaService.participant.update({
        where: {
          id: newParticipant.id,
        },
        data: {
          trials: {
            connect: {
              id: trialId,
            },
          },
        },
      });
    }
    return newParticipant;
  }
}
