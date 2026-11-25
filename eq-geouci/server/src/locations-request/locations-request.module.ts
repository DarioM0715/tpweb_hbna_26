import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { LocationsRequestService } from './locations-request.service.js';
import { LocationsRequestController } from './locations-request.controller.js';

@Module({
  imports: [PrismaModule],
  controllers: [LocationsRequestController],
  providers: [LocationsRequestService],
})
export class LocationsRequestModule {}
