import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateCategoryDto } from './dto/create-category.dto.js';
import type { UpdateCategoryDto } from './dto/update-category.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { PaginationQueryDto } from '../common/dto/pagination.dto.js';
import { buildPagination, toPaginatedResult} from '../common/helpers/pagination.helpers.js';
import { buildOrderBy } from '../common/helpers/pagination.helpers.js';

@Injectable()
export class CategoriesService {
  constructor (private readonly prisma: PrismaService) {}

  create(data: CreateCategoryDto) {
    return this.prisma.category.create({ data })
  }

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const where = query.search
      ? {
          OR: [
            { name: { contains: query.search, mode: 'insensitive' as const } },
            { description: { contains: query.search, mode: 'insensitive' as const } },
          ],
        }
      : undefined;
    const orderBy = buildOrderBy(
      query.sort,
      query.order,
      ['name', 'description'] as const,
      'name',
    );

    const [total, data] = await Promise.all([
      this.prisma.category.count({ where }),
      this.prisma.category.findMany({ where, skip, take, orderBy }),
    ]);

    return toPaginatedResult(data, total, page, limit);
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Categoria con id ${id} no encontrado`);
    }

    return category;
  }

  async update(id: string, data: UpdateCategoryDto) {
    await this.findOne(id)

    return this.prisma.category.update({ where: {id}, data })
  }

  async remove(id: string) {
    await this.findOne(id)

    return this.prisma.category.delete({ where: {id} })
  }
}
