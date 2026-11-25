import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  start_date?: Date | string;

  @ApiProperty({ required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  end_date?: Date | string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  its_official?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  outstanding?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  mapId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  organizerId?: string;
}
