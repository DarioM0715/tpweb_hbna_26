import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { LocationsRequestService } from './locations-request.service.js';

describe('LocationsRequestService', () => {
  let service: LocationsRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsRequestService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<LocationsRequestService>(LocationsRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
