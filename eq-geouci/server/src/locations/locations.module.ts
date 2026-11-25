import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { LocationsService } from './locations.service.js';
import { LocationsController } from './locations.controller.js';

@Module({
  imports: [PrismaModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
