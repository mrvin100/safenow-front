'use server';

import { checkUserSession } from '@src/helpers/sessions';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

export const countGeneratedQuotesAction = createServerAction().handler(async () => {
	try {
		const auth = await checkUserSession();

		const response = await fetch(`${process.env.API_URL}/artisan/quote-count/${auth.user.id}`, {
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
		console.error('Error while counting quotes: ', (error as any).message);
		throw new ZSAError('ERROR', (error as any).message);
	}
});

export const countInitProjectsAction = createServerAction().handler(async () => {
	try {
		const auth = await checkUserSession();

		const response = await fetch(`${process.env.API_URL}/artisan/project-count/${auth.user.id}`, {
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
		console.error('Error while counting projects: ', (error as any).message);
		throw new ZSAError('ERROR', (error as any).message);
	}
});

export const countCollaboratorsAction = createServerAction().handler(async () => {
	try {
		const auth = await checkUserSession();

		const response = await fetch(`${process.env.API_URL}/artisan/collaborator-count/${auth.user.id}`, {
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
		console.error('Error while counting collaborators: ', (error as any).message);
		throw new ZSAError('ERROR', (error as any).message);
	}
});

/**
 * This is a simple action that returns the number of collaborators for a project.
 */
export const countProjectCollaboratorsAction = createServerAction()
	.input(z.object({ projectId: z.string() }))
	.handler(async () => {
		// TODO implement this function
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return { count: Math.ceil(Math.random() * 10) };
	});
