'use server';

import { InvitationModel, InvitationStatus } from '@src/helpers/models/invitation.model';
import { checkUserSession } from '@src/helpers/sessions';
import { getQueryParams } from '@src/helpers/util-functions';
import { ResponseCollectionType } from '@src/helpers/util-types';
import z from 'zod';
import { createServerAction } from 'zsa';

export const sendInvitationAction = createServerAction()
	.input(z.object({ emitTo: z.string() }))
	.handler<Promise<InvitationModel>>(async (input) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${process.env.API_URL}/invitations`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${auth.token}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(input),
			});

			const data = await response.json();

			return data;
		} catch (error) {
			console.log('Error when sending invitation : ', error);
			return null;
		}
	});

export const getInvitationsAction = createServerAction()
	.input(z.object({ limit: z.number(), page: z.number(), status: z.nativeEnum(InvitationStatus) }))
	.handler<Promise<ResponseCollectionType<InvitationModel[]>>>(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const query = getQueryParams(input);

			const response = await fetch(`${process.env.API_URL}/invitations${query}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			});

			const data = await response.json();

			return data;
		} catch (error) {
			console.log('Error when getting invitations : ', error);
			return null;
		}
	});

export const getCollaboratorsAction = createServerAction()
	.input(z.object({ limit: z.number(), page: z.number() }))
	.handler<Promise<ResponseCollectionType<InvitationModel[]>>>(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const query = getQueryParams(input);

			const response = await fetch(`${process.env.API_URL}/invitations/collaborators${query}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			});

			const data = await response.json();

			return data;
		} catch (error) {
			console.log('Error when getting collaborators : ', error);
			return null;
		}
	});

export const updateInvitationAction = createServerAction()
	.input(z.object({ id: z.string(), status: z.string() }))
	.handler<Promise<InvitationModel>>(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${process.env.API_URL}/invitations/${input.id}`, {
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${auth.token}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(input),
			});

			const data = await response.json();

			return data;
		} catch (error) {
			console.log('Error when updating invitation : ', error);
			return null;
		}
	});

export const deleteInvitationAction = createServerAction()
	.input(z.object({ id: z.string() }))
	.handler<Promise<boolean>>(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${process.env.API_URL}/invitations/${input.id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${auth.token}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			});

			return response.ok;
		} catch (error) {
			console.log('Error when deleting invitation : ', error);
			return false;
		}
	});
