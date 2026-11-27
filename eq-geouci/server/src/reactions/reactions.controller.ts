import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReactionsService } from './reactions.service.js';
import { createReactionSchema, type CreateReactionDto } from './dto/create-reaction.dto.js';
import { updateReactionSchema, type UpdateReactionDto } from './dto/update-reaction.dto.js';
import { paginationQuerySchema, type PaginationQueryDto } from '../common/dto/pagination.dto.js';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  createReaction(@Body({ schema: createReactionSchema }) createReactionDto: CreateReactionDto) {
    return this.reactionsService.create(createReactionDto);
  }

  @Get()
  getAllReactions(@Query({ schema: paginationQuerySchema }) query: PaginationQueryDto) {
    return this.reactionsService.findAll(query);
  }

  @Get(':id')
  getReaction(@Param('id') id: string) {
    return this.reactionsService.findOne(id);
  }

  @Patch(':id')
  updateReaction(@Param('id') id: string, @Body({ schema: updateReactionSchema }) updateReactionDto: UpdateReactionDto) {
    return this.reactionsService.update(id, updateReactionDto);
  }

  @Delete(':id')
  removeReaction(@Param('id') id: string) {
    return this.reactionsService.remove(id);
  }
}
