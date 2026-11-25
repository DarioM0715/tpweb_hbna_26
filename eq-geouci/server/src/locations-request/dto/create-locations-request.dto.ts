import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { LocationRequestStatus } from '../../generated/prisma/enums.js';

export class CreateLocationsRequestDto {
  @ApiProperty({ description: 'The id of the user requesting the location' })
  @IsString()
  @IsNotEmpty()
  applicantId: string;

  @ApiProperty({ description: 'The id of the category of the requested location' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ required: false, description: 'The id of the manager that handles the request' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  managerId?: string;

  @ApiProperty({ required: false, description: 'The id of the location created from the request' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  locationId?: string;

  @ApiProperty({ description: 'The name of the requested location' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, description: 'The description of the requested location' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The reason of the request' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ enum: LocationRequestStatus, required: false, default: LocationRequestStatus.pending })
  @IsOptional()
  @IsEnum(LocationRequestStatus)
  status?: LocationRequestStatus;

  @ApiProperty({ description: 'The latitude of the requested location' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'The longitude of the requested location' })
  @IsNumber()
  longitude: number;
}
