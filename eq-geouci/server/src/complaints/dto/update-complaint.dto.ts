import { z } from 'zod';
import { createComplaintSchema } from './create-complaint.dto.js';

export const updateComplaintSchema = createComplaintSchema.partial();

export type UpdateComplaintDto = z.infer<typeof updateComplaintSchema>;
