import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { PaginationQueryDto } from '../common/dto/pagination.dto.js';
import { buildPagination, toPaginatedResult } from '../common/helpers/pagination.helpers.js';
import { buildOrderBy } from '../common/helpers/pagination.helpers.js';
import type { CreateLocationsRequestDto } from './dto/create-locations-request.dto.js';
import type { UpdateLocationsRequestDto } from './dto/update-locations-request.dto.js';

@Injectable()
export class LocationsRequestService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLocationsRequestDto) {
    return this.prisma.locationRequest.create({ data });
  }

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const where = query.search
      ? {
          OR: [
            { name: { contains: query.search, mode: 'insensitive' as const } },
            { description: { contains: query.search,   mode: 'insensitive' as const } },
            { reason: { contains: query.search, mode: 'insensitive' as const } },
          ],
        }
      : undefined;
    const orderBy = buildOrderBy(
      query.sort,
      query.order,
      ['name', 'status', 'created_at'] as const,
      'created_at',
    );

    const [total, data] = await Promise.all([
      this.prisma.locationRequest.count({ where }),
      this.prisma.locationRequest.findMany({ where, skip, take, orderBy }),
    ]);

    return toPaginatedResult(data, total, page, limit);
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
