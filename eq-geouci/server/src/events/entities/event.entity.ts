import { ApiProperty } from '@nestjs/swagger';

export class Event {
  @ApiProperty({ description: 'The unique identifier of the event' })
  id: string;
  @ApiProperty({ description: 'The id of the map where the event takes place' })
  mapId: string;
  @ApiProperty({ description: 'The id of the category of the event' })
  categoryId: string;
  @ApiProperty({ description: 'The id of the user organizing the event' })
  organizerId: string;
  @ApiProperty({ description: 'The name of the event' })
  name: string;
  @ApiProperty({ description: 'The description of the event' })
  description: string | null;
  @ApiProperty({ description: 'The start date of the event' })
  start_date: Date;
  @ApiProperty({ description: 'The end date of the event' })
  end_date: Date;
  @ApiProperty({ description: 'Indicates if the event is official' })
  its_official: boolean;
  @ApiProperty({ description: 'Indicates if the event is outstanding' })
  outstanding: boolean;
}
