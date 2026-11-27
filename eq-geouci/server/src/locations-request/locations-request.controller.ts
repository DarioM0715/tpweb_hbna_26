import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LocationsRequestService } from './locations-request.service.js';
import { createLocationsRequestSchema, type CreateLocationsRequestDto } from './dto/create-locations-request.dto.js';
import { updateLocationsRequestSchema, type UpdateLocationsRequestDto } from './dto/update-locations-request.dto.js';
import { paginationQuerySchema, type PaginationQueryDto } from '../common/dto/pagination.dto.js';

@Controller('locations-request')
export class LocationsRequestController {
  constructor(private readonly locationsRequestService: LocationsRequestService) {}

  @Post()
  createLocationRequest(@Body({ schema: createLocationsRequestSchema }) createLocationsRequestDto: CreateLocationsRequestDto) {
    return this.locationsRequestService.create(createLocationsRequestDto);
  }

  @Get()
  getAllLocationRequests(@Query({ schema: paginationQuerySchema }) query: PaginationQueryDto) {
    return this.locationsRequestService.findAll(query);
  }

  @Get(':id')
  getLocationRequest(@Param('id') id: string) {
    return this.locationsRequestService.findOne(id);
  }

  @Patch(':id')
  updateLocationRequest(@Param('id') id: string, @Body({ schema: updateLocationsRequestSchema }) updateLocationsRequestDto: UpdateLocationsRequestDto) {
    return this.locationsRequestService.update(id, updateLocationsRequestDto);
  }

  @Delete(':id')
  removeLocationRequest(@Param('id') id: string) {
    return this.locationsRequestService.remove(id);
  }
}
