'use server';

import { AppointmentModel, AppointmentStatus } from '@src/helpers/models/appointment.model';
import { checkUserSession } from '@src/helpers/sessions';
import { getQueryParams } from '@src/helpers/util-functions';
import { ResponseCollectionType } from '@src/helpers/util-types';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

const baseUrl = `${process.env.API_URL}/appointement`;

export const getAppointmentsAction = createServerAction().handler<Promise<AppointmentModel[]>>(async () => {
	try{
		const auth = await checkUserSession()
		const response = await fetch(`${baseUrl}/user/${auth?.user.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${auth?.token}`,
			},
		});
		const jsonResponse = await response.json()
		if(!response.ok){
			throw new ZSAError('ERROR', jsonResponse.error)
		}
		return jsonResponse
	}catch(error){
		console.log('Error while geting quotes : ', (error as any).message);
		throw new ZSAError('ERROR', (error as any).message)
	}
});

export const getArtisanAppointmentsAction = createServerAction()
	.input(
		z.object({
			limit: z.optional(z.number()),
			page: z.optional(z.number()),
			status: z.optional(z.nativeEnum(AppointmentStatus)),
		})
	)
	.handler<Promise<ResponseCollectionType<AppointmentModel[]>>>(async ({ input }) => {
		try {
			const auth = await checkUserSession();
			let query = getQueryParams(input);

			const url = `${baseUrl}/artisan/${auth.user.id}${query}`;

			const response = await fetch(url, {
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

			return jsonResponse;
		} catch (error) {
			console.error('Error while getting projects: ', error);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});