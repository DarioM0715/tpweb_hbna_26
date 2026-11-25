import { ApiProperty } from '@nestjs/swagger';

export class Map {
  @ApiProperty({ description: 'The unique identifier of the map' })
  id: string;
  @ApiProperty({ description: 'The name of the map' })
  name: string;
  @ApiProperty({ description: 'The minimum latitude of the map' })
  lat_min: number;
  @ApiProperty({ description: 'The maximum latitude of the map' })
  lat_max: number;
  @ApiProperty({ description: 'The minimum longitude of the map' })
  lon_min: number;
  @ApiProperty({ description: 'The maximum longitude of the map' })
  lon_max: number;
}
