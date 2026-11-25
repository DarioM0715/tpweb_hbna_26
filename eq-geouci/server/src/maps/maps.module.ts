import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { MapsService } from './maps.service.js';
import { MapsController } from './maps.controller.js';

@Module({
  imports: [PrismaModule],
  controllers: [MapsController],
  providers: [MapsService],
})
export class MapsModule {}
