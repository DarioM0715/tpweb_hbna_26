import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateReactionDto } from './dto/create-reaction.dto.js';
import type { UpdateReactionDto } from './dto/update-reaction.dto.js';

@Injectable()
export class ReactionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateReactionDto) {
    return this.prisma.reaction.create({ data });
  }

  findAll() {
    return this.prisma.reaction.findMany();
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
