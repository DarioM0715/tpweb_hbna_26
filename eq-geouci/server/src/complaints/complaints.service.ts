import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateComplaintDto } from './dto/create-complaint.dto.js';
import { UpdateComplaintDto } from './dto/update-complaint.dto.js';

@Injectable()
export class ComplaintsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateComplaintDto) {
    return this.prisma.complaint.create({ data });
  }

  findAll() {
    return this.prisma.complaint.findMany();
  }

  async findOne(id: string) {
    const complaint = await this.prisma.complaint.findUnique({ where: { id } });

    if (!complaint) {
      throw new NotFoundException(`Denuncia con id ${id} no encontrada`);
    }

    return complaint;
  }

  async update(id: string, data: UpdateComplaintDto) {
    await this.findOne(id);

    return this.prisma.complaint.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.complaint.delete({ where: { id } });
  }
}
