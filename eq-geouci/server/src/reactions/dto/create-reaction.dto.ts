import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReactionDto {
  @ApiProperty({ description: 'The id of the event the reaction belongs to' })
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({ description: 'The id of the user that reacted to the event' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  validated?: boolean;
}
