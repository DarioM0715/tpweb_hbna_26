import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'The id of the map the location belongs to' })
  @IsString()
  @IsNotEmpty()
  mapId: string;

  @ApiProperty({ description: 'The id of the category of the location' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ description: 'The name of the location' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the location' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The latitude of the location' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'The longitude of the location' })
  @IsNumber()
  longitude: number;

  @ApiProperty({ description: 'Indicates if the location is official' })
  @IsBoolean()
  its_official: boolean;
}
