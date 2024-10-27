import z from 'zod';

export const searchSchema = z.object({
	profession: z.string(),
	address: z.string(),
	location: z
		.object({
			lat: z.number(),
			lng: z.number(),
		})
		.optional(),
});

export type SearchSchema = z.infer<typeof searchSchema>;
