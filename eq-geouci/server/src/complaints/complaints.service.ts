import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { PaginationQueryDto } from '../common/dto/pagination.dto.js';
import { buildPagination, toPaginatedResult } from '../common/helpers/pagination.helpers.js';
import { buildOrderBy } from '../common/helpers/pagination.helpers.js';
import type { CreateComplaintDto } from './dto/create-complaint.dto.js';
import type { UpdateComplaintDto } from './dto/update-complaint.dto.js';

@Injectable()
export class ComplaintsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateComplaintDto) {
    return this.prisma.complaint.create({ data });
  }

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const where = query.search
      ? { reason: { contains: query.search, mode: 'insensitive' as const } }
      : undefined;
    const orderBy = buildOrderBy(
      query.sort,
      query.order,
      ['created_at'] as const,
      'created_at',
    );

    const [total, data] = await Promise.all([
      this.prisma.complaint.count({ where }),
      this.prisma.complaint.findMany({ where, skip, take, orderBy }),
    ]);

    return toPaginatedResult(data, total, page, limit);
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
