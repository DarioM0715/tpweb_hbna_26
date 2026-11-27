import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LocationsService } from './locations.service.js';
import { createLocationSchema, type CreateLocationDto } from './dto/create-location.dto.js';
import { updateLocationSchema, type UpdateLocationDto } from './dto/update-location.dto.js';
import { paginationQuerySchema, type PaginationQueryDto } from '../common/dto/pagination.dto.js';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  createLocation(@Body({ schema: createLocationSchema }) createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  getAllLocations(@Query({ schema: paginationQuerySchema }) query: PaginationQueryDto) {
    return this.locationsService.findAll(query);
  }

  @Get(':id')
  getLocation(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }

  @Patch(':id')
  updateLocation(@Param('id') id: string, @Body({ schema: updateLocationSchema }) updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  removeLocation(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }
}
