import { z } from 'zod';
import { LocationRequestStatus } from '../../generated/prisma/enums.js';

export const createLocationsRequestSchema = z.object({
  applicantId: z.string().trim().min(1).describe('The id of the user requesting the location'),
  categoryId: z.string().trim().min(1).describe('The id of the category of the requested location'),
  managerId: z.string().trim().min(1).optional().describe('The id of the manager that handles the request'),
  locationId: z.string().trim().min(1).optional().describe('The id of the location created from the request'),
  name: z.string().trim().min(1).describe('The name of the requested location'),
  description: z.string().optional().describe('The description of the requested location'),
  reason: z.string().trim().min(1).describe('The reason of the request'),
  status: z
    .enum(LocationRequestStatus)
    .optional()
    .default(LocationRequestStatus.pending)
    .describe('The status of the request'),
  latitude: z.number().describe('The latitude of the requested location'),
  longitude: z.number().describe('The longitude of the requested location'),
});

export type CreateLocationsRequestDto = z.infer<typeof createLocationsRequestSchema>;
