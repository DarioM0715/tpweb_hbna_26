import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { ReactionsService } from './reactions.service.js';

describe('ReactionsService', () => {
  let service: ReactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactionsService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<ReactionsService>(ReactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
