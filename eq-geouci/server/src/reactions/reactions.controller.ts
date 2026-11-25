import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReactionsService } from './reactions.service.js';
import { CreateReactionDto } from './dto/create-reaction.dto.js';
import { UpdateReactionDto } from './dto/update-reaction.dto.js';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  createReaction(@Body() createReactionDto: CreateReactionDto) {
    return this.reactionsService.create(createReactionDto);
  }

  @Get()
  getAllReactions() {
    return this.reactionsService.findAll();
  }

  @Get(':id')
  getReaction(@Param('id') id: string) {
    return this.reactionsService.findOne(id);
  }

  @Patch(':id')
  updateReaction(@Param('id') id: string, @Body() updateReactionDto: UpdateReactionDto) {
    return this.reactionsService.update(id, updateReactionDto);
  }

  @Delete(':id')
  removeReaction(@Param('id') id: string) {
    return this.reactionsService.remove(id);
  }
}
