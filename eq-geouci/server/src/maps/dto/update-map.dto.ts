import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMapDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  lat_min?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  lat_max?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  lon_min?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  lon_max?: number;
}
