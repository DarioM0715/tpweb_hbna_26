import { ApiProperty } from '@nestjs/swagger';

export class Comment {
  @ApiProperty({ description: 'The unique identifier of the comment' })
  id: string;
  @ApiProperty({ description: 'The id of the event the comment belongs to' })
  eventId: string;
  @ApiProperty({ description: 'The id of the user that wrote the comment' })
  userId: string;
  @ApiProperty({ description: 'The text of the comment' })
  text: string;
  @ApiProperty({ description: 'The date the comment was created' })
  created_at: Date;
  @ApiProperty({ description: 'The date the comment was last edited' })
  edited_at: Date;
}
