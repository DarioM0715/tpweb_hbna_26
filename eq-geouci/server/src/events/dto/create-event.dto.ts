import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ description: 'The name of the event' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, description: 'The description of the event' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The start date of the event' })
  @Type(() => Date)
  @IsDate()
  start_date: Date | string;

  @ApiProperty({ description: 'The end date of the event' })
  @Type(() => Date)
  @IsDate()
  end_date: Date | string;

  @ApiProperty({ description: 'Indicates if the event is official' })
  @IsBoolean()
  its_official: boolean;

  @ApiProperty({ description: 'Indicates if the event is outstanding' })
  @IsBoolean()
  outstanding: boolean;

  @ApiProperty({ description: 'The id of the map where the event takes place' })
  @IsString()
  @IsNotEmpty()
  mapId: string;

  @ApiProperty({ description: 'The id of the category of the event' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ description: 'The id of the user organizing the event' })
  @IsString()
  @IsNotEmpty()
  organizerId: string;
}
