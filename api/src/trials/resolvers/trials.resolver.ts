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
    @Args('trialId', { nullable: true }) trialId: string,
  ): Promise<Participant> {
    return await this.trialsService.createParticipant(participantInfo, trialId);
  }
}
