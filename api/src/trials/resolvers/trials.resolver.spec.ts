import { Test, TestingModule } from '@nestjs/testing';
import { TrialsResolver } from './trials.resolver';
import { PrismaService } from 'src/common/prisma.service';
import { TrialsService } from '../services/trials.service';

describe('TrialsResolver', () => {
  const OLD_ENV = process.env;
  let resolver: TrialsResolver;

  beforeEach(async () => {
    process.env = { ...OLD_ENV };
    process.env.DATABASE_URL = 'file:./test.db';
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrialsResolver, PrismaService, TrialsService],
    }).compile();

    resolver = module.get<TrialsResolver>(TrialsResolver);
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
});
