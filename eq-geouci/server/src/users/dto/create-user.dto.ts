import { z } from 'zod';
import { Role } from '../../generated/prisma/enums.js';

export const createUserSchema = z.object({
  name: z.string().trim().min(1).describe('The name of the user'),
  email: z.string().trim().min(1).describe('The email of the user'),
  lapel: z.string().trim().min(1).describe('The lapel of the user'),
  role: z.enum(Role).optional().default(Role.user),
  is_resident: z.boolean().optional().default(false),
  suspended: z.boolean().optional().default(false),
  reason_suspension: z.string().optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
