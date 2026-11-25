import { ApiProperty } from '@nestjs/swagger';

export class Complaint {
  @ApiProperty({ description: 'The unique identifier of the complaint' })
  id: string;
  @ApiProperty({ description: 'The id of the event the complaint belongs to' })
  eventId: string;
  @ApiProperty({ description: 'The id of the user that made the complaint' })
  userId: string;
  @ApiProperty({ description: 'The reason of the complaint' })
  reason: string;
  @ApiProperty({ description: 'The date the complaint was created' })
  created_at: Date;
}
