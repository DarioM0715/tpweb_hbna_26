import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { PaginationQueryDto } from '../common/dto/pagination.dto.js';
import { buildPagination, toPaginatedResult } from '../common/helpers/pagination.helpers.js';
import { buildOrderBy } from '../common/helpers/pagination.helpers.js';
import type { CreateReactionDto } from './dto/create-reaction.dto.js';

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
import type { UpdateReactionDto } from './dto/update-reaction.dto.js';

@Injectable()
export class ReactionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateReactionDto) {
    return this.prisma.reaction.create({ data });
  }

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    // eventId y userId son UUID: no admiten `contains`/`mode: insensitive`.
    const where = !query.search
      ? undefined
      : UUID_PATTERN.test(query.search)
        ? {
            OR: [
              { id: { equals: query.search } },
              { eventId: { equals: query.search } },
              { userId: { equals: query.search } },
            ],
          }
        : { id: { in: [] } };
    const orderBy = buildOrderBy(
      query.sort,
      query.order,
      ['created_at', 'validated'] as const,
      'created_at',
    );

    const [total, data] = await Promise.all([
      this.prisma.reaction.count({ where }),
      this.prisma.reaction.findMany({ where, skip, take, orderBy }),
    ]);

    return toPaginatedResult(data, total, page, limit);
  }

  async findOne(id: string) {
    const reaction = await this.prisma.reaction.findUnique({ where: { id } });

    if (!reaction) {
      throw new NotFoundException(`Reacción con id ${id} no encontrada`);
    }

    return reaction;
  }

  async update(id: string, data: UpdateReactionDto) {
    await this.findOne(id);

    return this.prisma.reaction.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.reaction.delete({ where: { id } });
  }
}
