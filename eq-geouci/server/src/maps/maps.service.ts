import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { PaginationQueryDto } from '../common/dto/pagination.dto.js';
import { buildPagination, toPaginatedResult } from '../common/helpers/pagination.helpers.js';
import { buildOrderBy } from '../common/helpers/pagination.helpers.js';
import type { CreateMapDto } from './dto/create-map.dto.js';
import type { UpdateMapDto } from './dto/update-map.dto.js';

@Injectable()
export class MapsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateMapDto) {
    return this.prisma.map.create({ data });
  }

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const where = query.search
      ? { name: { contains: query.search, mode: 'insensitive' as const } }
      : undefined;
    const orderBy = buildOrderBy(
      query.sort,
      query.order,
      ['name', 'lat_min', 'lat_max', 'lon_min', 'lon_max'] as const,
      'name',
    );

    const [total, data] = await Promise.all([
      this.prisma.map.count({ where }),
      this.prisma.map.findMany({ where, skip, take, orderBy }),
    ]);

    return toPaginatedResult(data, total, page, limit);
  }

  async findOne(id: string) {
    const map = await this.prisma.map.findUnique({ where: { id } });

    if (!map) {
      throw new NotFoundException(`Mapa con id ${id} no encontrado`);
    }

    return map;
  }

  async update(id: string, data: UpdateMapDto) {
    await this.findOne(id);

    return this.prisma.map.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.map.delete({ where: { id } });
  }
}
