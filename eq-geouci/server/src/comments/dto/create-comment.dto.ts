import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: 'The id of the event the comment belongs to' })
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({ description: 'The id of the user that wrote the comment' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'The text of the comment' })
  @IsString()
  @IsNotEmpty()
  text: string;
}
