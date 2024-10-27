import { z } from 'zod';

export const serviceSchema = z.object({
	id: z.optional(z.string()),
	userId: z.optional(z.string()),
	label: z.string(),
	description: z.string(),
	price: z.string().regex(/^\d+(\.\d{1,2})?$/),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;
