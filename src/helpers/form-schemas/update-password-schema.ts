import { z } from 'zod';

export const updatePasswordSchema = z
	.object({
		oldPassword: z.string(),
		password: z.string(),
		confirm_password: z.string(),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirm_password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Le mot de passe et la confirmation ne correspondent pas',
				path: ['confirm_password'],
			});
		}
	});

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
