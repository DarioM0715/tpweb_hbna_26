import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { PaginationQueryDto } from '../common/dto/pagination.dto.js';
import { buildPagination, toPaginatedResult } from '../common/helpers/pagination.helpers.js';
import { buildOrderBy } from '../common/helpers/pagination.helpers.js';
import type { CreateLocationDto } from './dto/create-location.dto.js';
import type { UpdateLocationDto } from './dto/update-location.dto.js';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLocationDto) {
    return this.prisma.location.create({ data });
  }

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const where = query.search
      ? {
          OR: [
            { name: { contains: query.search, mode: 'insensitive' as const } },
            {description: { contains: query.search,  mode: 'insensitive' as const } },
          ],
        }
      : undefined;
    const orderBy = buildOrderBy(
      query.sort,
      query.order,
      ['name', 'latitude', 'longitude', 'created_at'] as const,
      'created_at',
    );

    const [total, data] = await Promise.all([
      this.prisma.location.count({ where }),
      this.prisma.location.findMany({ where, skip, take, orderBy }),
    ]);

    return toPaginatedResult(data, total, page, limit);
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
