import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
    @ApiProperty({ description: 'The name of the category' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Category description' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description: string;
}
