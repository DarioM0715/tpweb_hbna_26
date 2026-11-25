import { ApiProperty } from '@nestjs/swagger';

export class Location {
  @ApiProperty({ description: 'The unique identifier of the location' })
  id: string;
  @ApiProperty({ description: 'The id of the map the location belongs to' })
  mapId: string;
  @ApiProperty({ description: 'The id of the category of the location' })
  categoryId: string;
  @ApiProperty({ description: 'The name of the location' })
  name: string;
  @ApiProperty({ description: 'The description of the location' })
  description: string;
  @ApiProperty({ description: 'The latitude of the location' })
  latitude: number;
  @ApiProperty({ description: 'The longitude of the location' })
  longitude: number;
  @ApiProperty({ description: 'Indicates if the location is official' })
  its_official: boolean;
  @ApiProperty({ description: 'The date the location was created' })
  created_at: Date;
}
