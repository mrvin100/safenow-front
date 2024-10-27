'use server';

import { QuoteModel, QuoteRequestModel } from '@src/helpers/models/quote.model';
import { checkUserSession } from '@src/helpers/sessions';
import { getQueryParams } from '@src/helpers/util-functions';
import { ResponseCollectionType } from '@src/helpers/util-types';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

/**
 * Count the number of quotes in the database
 */
export const getArtisanRequestedQuoteAction = createServerAction()
	.input(z.object({ limit: z.optional(z.number()), page: z.optional(z.number()) }))
	.handler<Promise<ResponseCollectionType<QuoteRequestModel[]>>>(async ({ input }) => {
		try {
			const auth = await checkUserSession();
			const query = getQueryParams(input);

			const response = await fetch(`${process.env.API_URL}/quote-request/artisan/${auth.user.id}${query}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`,
				},
			});

			return response.json();
		} catch (error) {
			console.error('Error while counting projects: ', error);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});

export const getRequestedQuoteById = createServerAction()
	.input(z.object({ requestedQuoteId: z.string() }))
	.handler<Promise<QuoteRequestModel>>(async ({ input }) => {
		const { requestedQuoteId } = input;

		try {
			const auth = await checkUserSession();

			const response = await fetch(`${process.env.API_URL}/quote-request/${requestedQuoteId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`,
				},
			});

			return response.json();
		} catch (error) {
			console.error('Error while getting requested quote: ', error);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});

export const getArtisanQuotes = createServerAction()
	.input(z.object({ limit: z.optional(z.number()), page: z.optional(z.number()) }))
	.handler<Promise<ResponseCollectionType<QuoteModel[]>>>(async ({ input }) => {
		try {
			const auth = await checkUserSession();
			const query = getQueryParams(input);

			const response = await fetch(`${process.env.API_URL}/quote/artisan/${auth.user.id}${query}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`,
				},
			});

			return response.json();
		} catch (error) {
			console.error('Error while getting quotes: ', error);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});

export const sendQuoteAction = createServerAction()
	.input(
		z.object({
			services: z.array(
				z.object({
					label: z.string().min(3),
					description: z.string().min(3),
					qte: z.number(),
					price: z.number(),
				})
			),
			quoteRequestId: z.string(),
			clientId: z.string(),
		})
	)
	.handler<Promise<void>>(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const body = {
				...input,
				label: '',
				totalAmount: input.services.reduce(
					(acc, service) => acc + Number(service.price) * Number(service.qte),
					0
				),
			};

			const response = await fetch(`${process.env.API_URL}/quote/${input.clientId}/${input.quoteRequestId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`,
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				throw new ZSAError('ERROR', 'Error while sending quote');
			}
		} catch (error) {
			console.error('Error while sending quote: ', error);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});
