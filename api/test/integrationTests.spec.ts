import { Test, TestingModule } from '@nestjs/testing';
import { TrialsResolver } from '../src/trials/resolvers/trials.resolver';
import { PrismaService } from 'src/common/prisma.service';
import { TrialsService } from '../src/trials/services/trials.service';

describe('TrialsIntegrationTests', () => {
  let resolver: TrialsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrialsResolver, PrismaService, TrialsService],
    }).compile();

    resolver = module.get<TrialsResolver>(TrialsResolver);
  });

  beforeAll(async () => {
    const prisma = new PrismaService();
    await prisma.trial.createMany({
      data: [{ id: '1' }, { id: '2' }],
    });
    await prisma.participant.createMany({
      data: [
        {
          name: 'Participant 1',
          hasDiabetes: true,
          hadCovid: false,
          height: 60,
          weight: 140,
        },
        {
          name: 'Participant 2',
          hasDiabetes: false,
          hadCovid: true,
          height: 40,
          weight: 170,
        },
      ],
    });
  });

  afterAll(async () => {
    const prisma = new PrismaService();
    const deleteTrials = prisma.trial.deleteMany();
    const deleteParticipants = prisma.participant.deleteMany();
    await prisma.$transaction([deleteTrials, deleteParticipants]);
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('trials', () => {
    it('should return all trials', async () => {
      const trials = await resolver.trials();
      expect(trials.length).toStrictEqual(2);
      expect(trials.map((element) => element.id)).toStrictEqual(['1', '2']);
    });
  });

  describe('participants', () => {
    it('should return all participants with correct info', async () => {
      const participants = await resolver.participants();
      expect(participants.length).toStrictEqual(2);
      expect(participants[0].name).toStrictEqual('Participant 1');
      expect(participants[0].hasDiabetes).toStrictEqual(true);
      expect(participants[0].height).toStrictEqual(60);
      expect(participants[0].weight).toStrictEqual(140);
    });
  });

  describe('createParticipant', () => {
    it('should create a new participant', async () => {
      let participants = await resolver.participants();
      const initialParticipantCount = participants.length;
      const newParticipantInfo = {
        name: 'Participant 3',
        height: 65,
        weight: 135,
        hasDiabetes: true,
        hadCovid: true,
      };
      const newParticipant =
        await resolver.createParticipant(newParticipantInfo);
      expect(newParticipant.name).toStrictEqual(newParticipantInfo.name);
      expect(newParticipant.hasDiabetes).toStrictEqual(
        newParticipantInfo.hasDiabetes,
      );
      expect(newParticipant.height).toStrictEqual(newParticipantInfo.height);
      expect(newParticipant.weight).toStrictEqual(newParticipantInfo.weight);
      participants = await resolver.participants();
      expect(participants.length).toStrictEqual(initialParticipantCount + 1);
    });
  });

  describe('enrollParticipant', () => {
    it('should link participant to a trial', async () => {
      const participants = await resolver.participants();
      let trials = await resolver.trials();
      expect(trials[0].participants.length).toStrictEqual(0);
      await resolver.enrollParticipant(participants[0].id, trials[0].id);
      trials = await resolver.trials();
      expect(trials[0].participants.length).toStrictEqual(1);
      expect(trials[0].participants[0].id).toStrictEqual(participants[0].id);
    });
  });
});
