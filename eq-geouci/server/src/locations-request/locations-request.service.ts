import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLocationsRequestDto } from './dto/create-locations-request.dto.js';
import { UpdateLocationsRequestDto } from './dto/update-locations-request.dto.js';

@Injectable()
export class LocationsRequestService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLocationsRequestDto) {
    return this.prisma.locationRequest.create({ data });
  }

  findAll() {
    return this.prisma.locationRequest.findMany();
  }

  async findOne(id: string) {
    const locationRequest = await this.prisma.locationRequest.findUnique({ where: { id } });

    if (!locationRequest) {
      throw new NotFoundException(`Solicitud de ubicación con id ${id} no encontrada`);
    }

    return locationRequest;
  }

  async update(id: string, data: UpdateLocationsRequestDto) {
    await this.findOne(id);

    return this.prisma.locationRequest.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.locationRequest.delete({ where: { id } });
  }
}
