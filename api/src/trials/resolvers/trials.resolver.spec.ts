import { Test, TestingModule } from '@nestjs/testing';
import { TrialsResolver } from './trials.resolver';
import { PrismaService } from 'src/common/prisma.service';
import { TrialsService } from '../services/trials.service';

describe('TrialsResolver', () => {
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
});
