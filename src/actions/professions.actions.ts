'use server';

import { professionSchema } from '@src/helpers/form-schemas/profession-schema';
import { ProfessionModel } from '@src/helpers/models/profession.model';
import { checkUserSession } from '@src/helpers/sessions';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

/**
 * Count the number of professions in the database
 */
export const countProfessionsAction = createServerAction().handler(async () => {
	try {
		const auth = await checkUserSession();

		const response = await fetch(`${process.env.API_URL}/profession/count`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${auth?.token}`,
			},
		});
		const jsonResponse = await response.json();

		if (!response.ok) {
			throw new ZSAError('ERROR', jsonResponse.error);
		}

		return jsonResponse as { count: number };
	} catch (error) {
		console.error('Error while counting professions: ', (error as any).message);
		throw new ZSAError('ERROR', (error as any).message);
	}
});

/**
 * Get the list of professions
 */
export const getProfessionsAction = createServerAction().handler(async () => {
	try {
		const response = await fetch(`${process.env.API_URL}/profession`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const jsonResponse = await response.json();

		if (!response.ok) {
			throw new ZSAError('ERROR', jsonResponse.error);
		}

		return jsonResponse as ProfessionModel[];
	} catch (error) {
		console.error('Error while getting professions: ', (error as any).message);
		throw new ZSAError('ERROR', (error as any).message);
	}
});

/**
 * profession/more-search-profession
 */
export const moreSearchProfessionAction = createServerAction().handler(async () => {
	try {
		const response = await fetch(`${process.env.API_URL}/profession/more-search-profession`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const jsonResponse = await response.json();

		if (!response.ok) {
			throw new ZSAError('ERROR', jsonResponse.error);
		}
		return Object.keys(jsonResponse).map((key) => jsonResponse[key]) as ProfessionModel[];
	} catch (error) {
		console.error('Error while getting more search professions: ', (error as any).message);
		throw new ZSAError('ERROR', (error as any).message);
	}
});

/**
 * Create a new profession
 */
export const createProfessionAction = createServerAction()
	.input(professionSchema)
	.handler(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${process.env.API_URL}/profession`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth?.token}`,
				},
				body: JSON.stringify(input),
			});
			const jsonResponse = await response.json();

			if (!response.ok) {
				throw new ZSAError('ERROR', jsonResponse.error);
			}

			return jsonResponse as ProfessionModel;
		} catch (error) {
			console.error('Error while creating profession: ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});

/**
 * Update a profession
 */
export const updateProfessionAction = createServerAction()
	.input(professionSchema)
	.handler(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${process.env.API_URL}/profession/${input.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth?.token}`,
				},
				body: JSON.stringify(input),
			});
			const jsonResponse = await response.json();

			if (!response.ok) {
				throw new ZSAError('ERROR', jsonResponse.error);
			}

			return jsonResponse as ProfessionModel;
		} catch (error) {
			console.error('Error while updating profession: ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});

/**
 * Delete a profession
 */
export const deleteProfessionAction = createServerAction()
	.input(z.object({ id: z.string() }))
	.handler(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${process.env.API_URL}/profession/${input.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth?.token}`,
				},
			});

			if (!response.ok) {
				const jsonResponse = await response.json();
				throw new ZSAError('ERROR', jsonResponse.error);
			}

			return true;
		} catch (error) {
			console.error('Error while deleting profession: ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});
