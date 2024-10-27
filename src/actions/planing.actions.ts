'use server';

import { PlaningModel } from '@src/helpers/models/planing.model';
import { checkUserSession } from '@src/helpers/sessions';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

const baseUrl = `${process.env.API_URL}/planning`;

export const createPlaningAction = createServerAction()
	.input(
		z.object({
			date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
			ranges: z.array(z.string()),
		})
	)
	.handler<Promise<PlaningModel>>(async ({ input }) => {
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
			console.log('Create planing data: ', data);

			return data;
		} catch (error) {
			console.error('Error while create new planing: ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});

export const getArtisanPlaningAction = createServerAction()
	.input(z.object({ month: z.string({ message: 'format MM-YYYY' }) }))
	.handler<Promise<PlaningModel[]>>(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const url = `${baseUrl}/user/${auth.user.id}?month=${input.month}`;

			const response = await fetch(url, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth?.token}`,
				},
			});

			const data = await response.json();

			return data;
		} catch (error) {
			console.error('Error while get artisan planing: ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});

export const deletePlaningAction = createServerAction()
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
			console.error('Error while delete planing: ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});
