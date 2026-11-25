import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { MapsService } from './maps.service.js';

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapsService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<MapsService>(MapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
