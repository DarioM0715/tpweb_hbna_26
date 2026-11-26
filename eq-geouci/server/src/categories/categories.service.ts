import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateCategoryDto } from './dto/create-category.dto.js';
import type { UpdateCategoryDto } from './dto/update-category.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CategoriesService {
  constructor (private readonly prisma: PrismaService) {}

  create(data: CreateCategoryDto) {
    return this.prisma.category.create({ data })
  }

  findAll() {
    return this.prisma.category.findMany()
  }

  async findOne(id: string) {
    const category = this.prisma.category.findUnique({ where: { id }} )

    if (!category) {
      throw new NotFoundException(`Categoria con id ${id} no encontrado`);
    }

    return category
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
