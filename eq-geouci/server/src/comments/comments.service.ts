import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { PaginationQueryDto } from '../common/dto/pagination.dto.js';
import { buildPagination, toPaginatedResult } from '../common/helpers/pagination.helpers.js';
import { buildOrderBy } from '../common/helpers/pagination.helpers.js';
import type { CreateCommentDto } from './dto/create-comment.dto.js';
import type { UpdateCommentDto } from './dto/update-comment.dto.js';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCommentDto) {
    return this.prisma.comment.create({ data });
  }

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const where = query.search
      ? { text: { contains: query.search, mode: 'insensitive' as const } }
      : undefined;
    const orderBy = buildOrderBy(
      query.sort,
      query.order,
      ['created_at', 'edited_at'] as const,
      'created_at',
    );

    const [total, data] = await Promise.all([
      this.prisma.comment.count({ where }),
      this.prisma.comment.findMany({ where, skip, take, orderBy }),
    ]);

    return toPaginatedResult(data, total, page, limit);
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`Comentario con id ${id} no encontrado`);
    }

    return comment;
  }

  async update(id: string, data: UpdateCommentDto) {
    await this.findOne(id);

    return this.prisma.comment.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.comment.delete({ where: { id } });
  }
}
