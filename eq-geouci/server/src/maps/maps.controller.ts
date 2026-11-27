import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MapsService } from './maps.service.js';
import { createMapSchema, type CreateMapDto } from './dto/create-map.dto.js';
import { updateMapSchema, type UpdateMapDto } from './dto/update-map.dto.js';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Post()
  createMap(@Body({ schema: createMapSchema }) createMapDto: CreateMapDto) {
    return this.mapsService.create(createMapDto);
  }

  @Get()
  getAllMaps() {
    return this.mapsService.findAll();
  }

  @Get(':id')
  getMap(@Param('id') id: string) {
    return this.mapsService.findOne(id);
  }

  @Patch(':id')
  updateMap(@Param('id') id: string, @Body({ schema: updateMapSchema }) updateMapDto: UpdateMapDto) {
    return this.mapsService.update(id, updateMapDto);
  }

  @Delete(':id')
  removeMap(@Param('id') id: string) {
    return this.mapsService.remove(id);
  }
}
