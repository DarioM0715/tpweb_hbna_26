import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ComplaintsService } from './complaints.service.js';
import { ComplaintsController } from './complaints.controller.js';

@Module({
  imports: [PrismaModule],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
})
export class ComplaintsModule {}
