import { Test, TestingModule } from '@nestjs/testing';
import { TrialsService } from './trials.service';
import { PrismaService } from 'src/common/prisma.service';

describe('TrialsService', () => {
  let service: TrialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrialsService, PrismaService],
    }).compile();

    service = module.get<TrialsService>(TrialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
