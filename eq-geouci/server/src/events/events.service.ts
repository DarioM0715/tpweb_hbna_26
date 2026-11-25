import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateEventDto) {
    return this.prisma.event.create({ data });
  }

  findAll() {
    return this.prisma.event.findMany();
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }

    return event;
  }

  async update(id: string, data: UpdateEventDto) {
    await this.findOne(id);

    return this.prisma.event.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.event.delete({ where: { id } });
  }
}
