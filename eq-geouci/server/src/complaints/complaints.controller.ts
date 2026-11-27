import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ComplaintsService } from './complaints.service.js';
import { createComplaintSchema, type CreateComplaintDto } from './dto/create-complaint.dto.js';
import { updateComplaintSchema, type UpdateComplaintDto } from './dto/update-complaint.dto.js';
import { paginationQuerySchema, type PaginationQueryDto } from '../common/dto/pagination.dto.js';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  createComplaint(@Body({ schema: createComplaintSchema }) createComplaintDto: CreateComplaintDto) {
    return this.complaintsService.create(createComplaintDto);
  }

  @Get()
  getAllComplaints(@Query({ schema: paginationQuerySchema }) query: PaginationQueryDto) {
    return this.complaintsService.findAll(query);
  }

  @Get(':id')
  getComplaint(@Param('id') id: string) {
    return this.complaintsService.findOne(id);
  }

  @Patch(':id')
  updateComplaint(@Param('id') id: string, @Body({ schema: updateComplaintSchema }) updateComplaintDto: UpdateComplaintDto) {
    return this.complaintsService.update(id, updateComplaintDto);
  }

  @Delete(':id')
  removeComplaint(@Param('id') id: string) {
    return this.complaintsService.remove(id);
  }
}
