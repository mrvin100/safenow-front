import { z } from 'zod';

export const userInfoSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	phone: z.string(),
	address: z.string(),
});

export type UserInfoSchema = z.infer<typeof userInfoSchema>;
