import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationsRequestService } from './locations-request.service.js';
import { CreateLocationsRequestDto } from './dto/create-locations-request.dto.js';
import { UpdateLocationsRequestDto } from './dto/update-locations-request.dto.js';

@Controller('locations-request')
export class LocationsRequestController {
  constructor(private readonly locationsRequestService: LocationsRequestService) {}

  @Post()
  createLocationRequest(@Body() createLocationsRequestDto: CreateLocationsRequestDto) {
    return this.locationsRequestService.create(createLocationsRequestDto);
  }

  @Get()
  getAllLocationRequests() {
    return this.locationsRequestService.findAll();
  }

  @Get(':id')
  getLocationRequest(@Param('id') id: string) {
    return this.locationsRequestService.findOne(id);
  }

  @Patch(':id')
  updateLocationRequest(@Param('id') id: string, @Body() updateLocationsRequestDto: UpdateLocationsRequestDto) {
    return this.locationsRequestService.update(id, updateLocationsRequestDto);
  }

  @Delete(':id')
  removeLocationRequest(@Param('id') id: string) {
    return this.locationsRequestService.remove(id);
  }
}
