import { Resolver, Query } from '@nestjs/graphql';
import { TrialsService } from '../services/trials.service';
import { Trial, Participant } from 'src/graphql';

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
}
