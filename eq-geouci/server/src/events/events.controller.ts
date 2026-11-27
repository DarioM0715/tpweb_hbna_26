import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventsService } from './events.service.js';
import { createEventSchema, type CreateEventDto } from './dto/create-event.dto.js';
import { updateEventSchema, type UpdateEventDto } from './dto/update-event.dto.js';
import { paginationQuerySchema, type PaginationQueryDto } from '../common/dto/pagination.dto.js';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  createEvent(@Body({ schema: createEventSchema }) createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  getAllEvents(@Query({ schema: paginationQuerySchema }) query: PaginationQueryDto) {
    return this.eventsService.findAll(query);
  }

  @Get(':id')
  getEvent(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  updateEvent(@Param('id') id: string, @Body({ schema: updateEventSchema }) updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  removeEvent(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
