import { Test, TestingModule } from '@nestjs/testing';
import { TrialsResolver } from '../src/trials/resolvers/trials.resolver';
import { PrismaService } from 'src/common/prisma.service';
import { TrialsService } from '../src/trials/services/trials.service';

describe('TrialsIntegratoinTests', () => {
  let resolver: TrialsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrialsResolver, PrismaService, TrialsService],
    }).compile();

    resolver = module.get<TrialsResolver>(TrialsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getTrials', () => {
    it('should return all trials', async () => {
      const trials = await resolver.trials();
      expect(trials.length).toStrictEqual(3);
      expect(trials.map((element) => element.id)).toStrictEqual([
        '1',
        '2',
        '3',
      ]);
    });
  });

  describe('getParticipants', () => {
    it('should return all participants', async () => {
      const participants = await resolver.participants();
      expect(participants.length).toStrictEqual(1);
      expect(participants[0].name).toStrictEqual('Thomas');
    });
  });
});
