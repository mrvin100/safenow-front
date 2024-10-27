import { z } from 'zod';
import { Role } from '../models/user.model';

export const signUpSchema = z.object({
  role: z.enum([Role.ADMIN, Role.ARTISAN, Role.CLIENT]),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(9),
  address: z.string().min(1),
  password: z.string().min(6),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
