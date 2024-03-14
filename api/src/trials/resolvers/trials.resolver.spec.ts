import { Test, TestingModule } from '@nestjs/testing';
import { TrialsResolver } from './trials.resolver';
import { PrismaService } from 'src/common/prisma.service';
import { TrialsService } from '../services/trials.service';

describe('TrialsResolver', () => {
  const OLD_ENV = process.env;
  let resolver: TrialsResolver;
  let trialsService: TrialsService;

  beforeEach(async () => {
    process.env = { ...OLD_ENV };
    process.env.DATABASE_URL = 'file:./test.db';
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrialsResolver, PrismaService, TrialsService],
    }).compile();

    resolver = module.get<TrialsResolver>(TrialsResolver);
    trialsService = module.get<TrialsService>(TrialsService);
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
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

  describe('validateParticipants', () => {
    it('should true for bmi > 18 && bmi < 30 && hasDiabetes && !hasCovid', async () => {
      const testParticipant = {
        id: 1,
        name: 'Test User',
        height: 70,
        weight: 140,
        hasDiabetes: true,
        hasCovid: false,
        enrolledDate: new Date(),
      };
      jest
        .spyOn(trialsService, 'getParticipant')
        .mockImplementation(() => Promise.resolve(testParticipant));
      expect(await resolver.validateParticipant(1)).toBe(true);
    });

    it('should false for bmi > 30', async () => {
      const testParticipant = {
        id: 1,
        name: 'Test User',
        height: 70,
        weight: 400,
        hasDiabetes: true,
        hasCovid: false,
        enrolledDate: new Date(),
      };
      jest
        .spyOn(trialsService, 'getParticipant')
        .mockImplementation(() => Promise.resolve(testParticipant));
      expect(await resolver.validateParticipant(1)).toBe(false);
    });

    it('should false for bmi < 18', async () => {
      const testParticipant = {
        id: 1,
        name: 'Test User',
        height: 70,
        weight: 32,
        hasDiabetes: true,
        hasCovid: false,
        enrolledDate: new Date(),
      };
      jest
        .spyOn(trialsService, 'getParticipant')
        .mockImplementation(() => Promise.resolve(testParticipant));
      expect(await resolver.validateParticipant(1)).toBe(false);
    });

    it('should false for if the participant has covid', async () => {
      const testParticipant = {
        id: 1,
        name: 'Test User',
        height: 70,
        weight: 140,
        hasDiabetes: true,
        hasCovid: true,
        enrolledDate: new Date(),
      };
      jest
        .spyOn(trialsService, 'getParticipant')
        .mockImplementation(() => Promise.resolve(testParticipant));
      expect(await resolver.validateParticipant(1)).toBe(false);
    });

    it('should false for if the participant does not have diabetes', async () => {
      const testParticipant = {
        id: 1,
        name: 'Test User',
        height: 70,
        weight: 140,
        hasDiabetes: false,
        hasCovid: false,
        enrolledDate: new Date(),
      };
      jest
        .spyOn(trialsService, 'getParticipant')
        .mockImplementation(() => Promise.resolve(testParticipant));
      expect(await resolver.validateParticipant(1)).toBe(false);
    });
  });
});
