import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { ComplaintsService } from './complaints.service.js';

describe('ComplaintsService', () => {
  let service: ComplaintsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplaintsService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<ComplaintsService>(ComplaintsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
