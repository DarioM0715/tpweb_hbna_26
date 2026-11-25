import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateComplaintDto {
  @ApiProperty({ description: 'The id of the event the complaint belongs to' })
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({ description: 'The id of the user that made the complaint' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'The reason of the complaint' })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
