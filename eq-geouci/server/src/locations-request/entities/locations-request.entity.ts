import { ApiProperty } from '@nestjs/swagger';
import { LocationRequestStatus } from '../../generated/prisma/enums.js';

export class LocationsRequest {
  @ApiProperty({ description: 'The unique identifier of the location request' })
  id: string;
  @ApiProperty({ description: 'The id of the user requesting the location' })
  applicantId: string;
  @ApiProperty({ description: 'The id of the category of the requested location' })
  categoryId: string;
  @ApiProperty({ description: 'The id of the manager that handles the request' })
  managerId: string | null;
  @ApiProperty({ description: 'The id of the location created from the request' })
  locationId: string | null;
  @ApiProperty({ description: 'The name of the requested location' })
  name: string;
  @ApiProperty({ description: 'The description of the requested location' })
  description: string | null;
  @ApiProperty({ description: 'The reason of the request' })
  reason: string;
  @ApiProperty({ enum: LocationRequestStatus, description: 'The status of the request' })
  status: LocationRequestStatus;
  @ApiProperty({ description: 'The latitude of the requested location' })
  latitude: number;
  @ApiProperty({ description: 'The longitude of the requested location' })
  longitude: number;
  @ApiProperty({ description: 'The date the request was created' })
  created_at: Date;
  @ApiProperty({ description: 'The date the request was done' })
  done_at: Date | null;
}
