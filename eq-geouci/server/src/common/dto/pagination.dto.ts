import { z } from 'zod';

export const paginationQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1)
    .describe('Page number, starting at 1'),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(20)
    .describe('Items per page, up to 100'),
  sort: z.string().trim().min(1).optional().describe('Field to sort by'),
  order: z.enum(['asc', 'desc']).default('asc').describe('Sort direction'),
  search: z.string().trim().min(1).optional().describe('Text to search for'),
});

export type PaginationQueryDto = z.infer<typeof paginationQuerySchema>;
