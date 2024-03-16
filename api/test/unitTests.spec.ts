import { Test, TestingModule } from '@nestjs/testing';
import { TrialsResolver } from '../src/trials/resolvers/trials.resolver';
import { PrismaService } from 'src/common/prisma.service';
import { TrialsService } from '../src/trials/services/trials.service';

describe('TrialsUnitTests', () => {
  let resolver: TrialsResolver;
  let trialsService: TrialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrialsResolver, PrismaService, TrialsService],
    }).compile();

    resolver = module.get<TrialsResolver>(TrialsResolver);
    trialsService = module.get<TrialsService>(TrialsService);
  });

  describe('validateParticipants', () => {
    it('should true for bmi > 18 && bmi < 30 && hasDiabetes && !hadCovid', async () => {
      const testParticipant = {
        id: 1,
        name: 'Test User',
        height: 70,
        weight: 140,
        hasDiabetes: true,
        hadCovid: false,
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
        hadCovid: false,
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
        hadCovid: false,
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
        hadCovid: true,
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
        hadCovid: false,
        enrolledDate: new Date(),
      };
      jest
        .spyOn(trialsService, 'getParticipant')
        .mockImplementation(() => Promise.resolve(testParticipant));
      expect(await resolver.validateParticipant(1)).toBe(false);
    });
  });
});
