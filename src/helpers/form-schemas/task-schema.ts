import { z } from 'zod';

export const taskSchema = z.object({
	id: z.optional(z.string()),
	projectId: z.string(),
	body: z.string(),
	description: z.string(),
	asignTo: z.string(),
	tags: z.array(z.string()),
});

export type TaskSchema = z.infer<typeof taskSchema>;
