import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComplaintsService } from './complaints.service.js';
import { CreateComplaintDto } from './dto/create-complaint.dto.js';
import { UpdateComplaintDto } from './dto/update-complaint.dto.js';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  createComplaint(@Body() createComplaintDto: CreateComplaintDto) {
    return this.complaintsService.create(createComplaintDto);
  }

  @Get()
  getAllComplaints() {
    return this.complaintsService.findAll();
  }

  @Get(':id')
  getComplaint(@Param('id') id: string) {
    return this.complaintsService.findOne(id);
  }

  @Patch(':id')
  updateComplaint(@Param('id') id: string, @Body() updateComplaintDto: UpdateComplaintDto) {
    return this.complaintsService.update(id, updateComplaintDto);
  }

  @Delete(':id')
  removeComplaint(@Param('id') id: string) {
    return this.complaintsService.remove(id);
  }
}
