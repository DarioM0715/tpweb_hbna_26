import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MapsService } from './maps.service.js';
import { CreateMapDto } from './dto/create-map.dto.js';
import { UpdateMapDto } from './dto/update-map.dto.js';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Post()
  createMap(@Body() createMapDto: CreateMapDto) {
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
  updateMap(@Param('id') id: string, @Body() updateMapDto: UpdateMapDto) {
    return this.mapsService.update(id, updateMapDto);
  }

  @Delete(':id')
  removeMap(@Param('id') id: string) {
    return this.mapsService.remove(id);
  }
}
