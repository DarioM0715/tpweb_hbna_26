import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLocationDto } from './dto/create-location.dto.js';
import { UpdateLocationDto } from './dto/update-location.dto.js';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLocationDto) {
    return this.prisma.location.create({ data });
  }

  findAll() {
    return this.prisma.location.findMany();
  }

  async findOne(id: string) {
    const location = await this.prisma.location.findUnique({ where: { id } });

    if (!location) {
      throw new NotFoundException(`Ubicación con id ${id} no encontrada`);
    }

    return location;
  }

  async update(id: string, data: UpdateLocationDto) {
    await this.findOne(id);

    return this.prisma.location.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.location.delete({ where: { id } });
  }
}
