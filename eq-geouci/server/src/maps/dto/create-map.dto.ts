import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMapDto {
  @ApiProperty({ description: 'The name of the map' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The minimum latitude of the map' })
  @IsNumber()
  lat_min: number;

  @ApiProperty({ description: 'The maximum latitude of the map' })
  @IsNumber()
  lat_max: number;

  @ApiProperty({ description: 'The minimum longitude of the map' })
  @IsNumber()
  lon_min: number;

  @ApiProperty({ description: 'The maximum longitude of the map' })
  @IsNumber()
  lon_max: number;
}
