import { z } from 'zod';

export const professionSchema = z.object({
	id: z.optional(z.string()),
	label: z.string(),
	description: z.string(),
});

export type ProfessionSchema = z.infer<typeof professionSchema>;
