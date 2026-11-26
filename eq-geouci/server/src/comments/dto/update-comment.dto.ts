import { z } from 'zod';
import { createCommentSchema } from './create-comment.dto.js';

export const updateCommentSchema = createCommentSchema.partial();

export type UpdateCommentDto = z.infer<typeof updateCommentSchema>;
