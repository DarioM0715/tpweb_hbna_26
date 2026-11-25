import { ApiProperty } from '@nestjs/swagger';

export class Reaction {
  @ApiProperty({ description: 'The unique identifier of the reaction' })
  id: string;
  @ApiProperty({ description: 'The id of the event the reaction belongs to' })
  eventId: string;
  @ApiProperty({ description: 'The id of the user that reacted to the event' })
  userId: string;
  @ApiProperty({ description: 'Indicates if the reaction was validated' })
  validated: boolean;
  @ApiProperty({ description: 'The date the reaction was created' })
  created_at: Date;
}
