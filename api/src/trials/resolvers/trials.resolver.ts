import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TrialsService } from '../services/trials.service';
import { Trial, Participant, ParticipantInfo } from 'src/graphql';

@Resolver()
export class TrialsResolver {
  constructor(private trialsService: TrialsService) {}

  @Query('trials')
  async trials(): Promise<Trial[]> {
    return await this.trialsService.getTrials();
  }

  @Query('participants')
  async participants(): Promise<Participant[]> {
    return await this.trialsService.getParticipants();
  }

  @Mutation('createParticipant')
  async createParticipant(
    @Args('participantInfo') participantInfo: ParticipantInfo,
  ): Promise<Participant> {
    return await this.trialsService.createParticipant(participantInfo);
  }

  @Mutation('enrollParticipant')
  async enrollParticipant(
    @Args('participantId') participantId: number,
    @Args('trialId') trialId: string,
  ): Promise<Participant> {
    return await this.trialsService.linkParticipantToTrial(
      participantId,
      trialId,
    );
  }

  @Query('validateParticipant')
  async validateParticipant(@Args('participantId') participantId: number) {
    const participant = await this.trialsService.getParticipant(participantId);
    const bmi = (participant.weight / participant.height ** 2) * 703;
    if (
      participant.hasDiabetes &&
      !participant.hadCovid &&
      bmi > 18 &&
      bmi < 30
    ) {
      return true;
    } else {
      return false;
    }
  }
}
