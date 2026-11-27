import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { PaginationQueryDto } from '../common/dto/pagination.dto.js';
import { buildPagination, toPaginatedResult } from '../common/helpers/pagination.helpers.js';
import { buildOrderBy } from '../common/helpers/pagination.helpers.js';
import type { CreateEventDto } from './dto/create-event.dto.js';
import type { UpdateEventDto } from './dto/update-event.dto.js';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateEventDto) {
    return this.prisma.event.create({ data });
  }

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const where = query.search
      ? {
          OR: [
            { name: { contains: query.search, mode: 'insensitive' as const } },
            { description: {   contains: query.search,   mode: 'insensitive' as const } },
          ],
        }
      : undefined;
    const orderBy = buildOrderBy(
      query.sort,
      query.order,
      ['name', 'start_date', 'end_date'] as const,
      'start_date',
    );

    const [total, data] = await Promise.all([
      this.prisma.event.count({ where }),
      this.prisma.event.findMany({ where, skip, take, orderBy }),
    ]);

    return toPaginatedResult(data, total, page, limit);
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
