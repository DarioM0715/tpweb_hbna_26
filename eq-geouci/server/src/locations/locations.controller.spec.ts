import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { LocationsController } from './locations.controller.js';
import { LocationsService } from './locations.service.js';

describe('LocationsController', () => {
  let controller: LocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [LocationsService, { provide: PrismaService, useValue: {} }],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
