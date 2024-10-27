import { z } from 'zod';

export const quoteServiceSchema = z.object({
	services: z.array(
		z.object({
			service: z.string(),
			qte: z.string().regex(/^\d+$/),
			price: z.string().regex(/^\d+$/),
		})
	),
});

export type QuoteServiceSchema = z.infer<typeof quoteServiceSchema>;
