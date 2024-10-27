'use server';

import { serviceSchema } from '@src/helpers/form-schemas/service-schema';
import { ServiceModel } from '@src/helpers/models/service.model';
import { checkUserSession } from '@src/helpers/sessions';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

/**
 * Get the list of services
 */
export const getServicesAction = createServerAction().handler(async () => {
	try {
		const auth = await checkUserSession();

		const response = await fetch(`${process.env.API_URL}/service/user/${auth.user.id}`, {
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

		return jsonResponse as ServiceModel[];
	} catch (error) {
		console.error('Error while getting services: ', (error as any).message);
		throw new ZSAError('ERROR', (error as any).message);
	}
});

/**
 * Create a new service
 */
export const createServiceAction = createServerAction()
	.input(serviceSchema)
	.handler(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${process.env.API_URL}/service`, {
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

			return jsonResponse as ServiceModel;
		} catch (error) {
			console.error('Error while creating service: ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});

/**
 * Update a service
 */
export const updateServiceAction = createServerAction()
	.input(serviceSchema)
	.handler(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${process.env.API_URL}/service/${input.id}`, {
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

			return jsonResponse as ServiceModel;
		} catch (error) {
			console.error('Error while updating service: ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});

/**
 * Delete a service
 */
export const deleteServiceAction = createServerAction()
	.input(z.object({ id: z.string() }))
	.handler(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${process.env.API_URL}/service/${input.id}`, {
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
			console.error('Error while deleting service: ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});
