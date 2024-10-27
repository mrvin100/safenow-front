'use server';

import { RangeModel } from '@src/helpers/models/planing.model';
import { checkUserSession } from '@src/helpers/sessions';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

const baseUrl = `${process.env.API_URL}/range`;

export const createRangeAction = createServerAction()
	.input(
		z.object({
			start: z.string(),
			end: z.string(),
			key_id: z.string(),
		})
	)
	.handler<Promise<RangeModel>>(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${baseUrl}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth?.token}`,
				},
				body: JSON.stringify(input),
			});

			const data = await response.json();

			return data;
		} catch (error) {
			console.error('Error while create new range: ', error);
			throw new ZSAError('ERROR', 'Erreur lors de la création de la plage');
		}
	});

export const deleteRangeAction = createServerAction()
	.input(z.object({ id: z.string() }))
	.handler(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${baseUrl}/${input.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth?.token}`,
				},
			});

			const data = await response.json();

			return data;
		} catch (error) {
			console.error('Error while delete range: ', error);
			throw new ZSAError('ERROR', 'Erreur lors de la suppression de la plage');
		}
	});
