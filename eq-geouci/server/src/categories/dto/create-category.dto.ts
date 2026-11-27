import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().trim().min(1).describe('The name of the category'),
  description: z.string().trim().min(1).describe('Category description'),
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
