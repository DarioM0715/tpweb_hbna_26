import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service.js';
import { createCommentSchema, type CreateCommentDto } from './dto/create-comment.dto.js';
import { updateCommentSchema, type UpdateCommentDto } from './dto/update-comment.dto.js';
import { paginationQuerySchema, type PaginationQueryDto } from '../common/dto/pagination.dto.js';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  createComment(@Body({ schema: createCommentSchema }) createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  getAllComments(@Query({ schema: paginationQuerySchema }) query: PaginationQueryDto) {
    return this.commentsService.findAll(query);
  }

  @Get(':id')
  getComment(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  updateComment(@Param('id') id: string, @Body({ schema: updateCommentSchema }) updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  removeComment(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
