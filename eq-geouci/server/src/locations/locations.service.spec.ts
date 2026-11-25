import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { LocationsService } from './locations.service.js';

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
