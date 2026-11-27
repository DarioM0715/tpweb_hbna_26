import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { createCategorySchema, type CreateCategoryDto } from './dto/create-category.dto.js';
import { updateCategorySchema, type UpdateCategoryDto } from './dto/update-category.dto.js';
import { paginationQuerySchema, type PaginationQueryDto } from '../common/dto/pagination.dto.js';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body({ schema: createCategorySchema }) createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  getAllCategory(@Query({ schema: paginationQuerySchema }) query: PaginationQueryDto) {
    return this.categoriesService.findAll(query);
  }

  @Get(':id')
  getCategory(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  updateCategory(@Param('id') id: string, @Body({ schema: updateCategorySchema }) updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  removeCategory(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
