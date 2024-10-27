'use server'
import { ProjectModel, ProjectStatus } from '@src/helpers/models/project.model';
import { QuoteModel } from '@src/helpers/models/quote.model';
import { checkUserSession } from '@src/helpers/sessions';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

/**
 * Count the number of in progress projects in the database
 */
export const countInProgressProjectsAction = createServerAction().handler(async () => {
	try{
		const auth = await checkUserSession()
		const response = await fetch(`${process.env.API_URL}/project/count/${auth?.user.id}?status=pending`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${auth?.token}`,
			},
		})
		const jsonResponse = await response.json()
		if(!response.ok){
			throw new ZSAError('ERROR', jsonResponse.error)
		}
		return jsonResponse as { count: number}
	}catch(error){
		console.log("Error while counting inprogress projects : ", (error as any).message)
		throw new ZSAError('ERROR', (error as any).message)
	}
});

/**
 * Count the number of complete projects in the database
 */
export const countCompleteProjectsAction = createServerAction().handler(async () => {
	try{
		const auth = await checkUserSession()
		const response = await fetch(`${process.env.API_URL}/project/count/${auth?.user.id}?status=completed`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${auth?.token}`
			},
		})
		const jsonResponse = await response.json()
		if(!response.ok){
			throw new ZSAError('ERROR', jsonResponse.error)
		}
		return jsonResponse as { count : number }
	}catch(error){
		console.error('Error while counting complete projects : ', (error as any).message)
		throw new ZSAError('ERROR', (error as any).message)
	}
});

/**
 * Count the number of quotes processed in the database
 */
export const countQuotesProcessedAction = createServerAction().handler(async () => {
	try{
		const auth = await checkUserSession()
		const response = await fetch(`${process.env.API_URL}/ask-quote/count/treated/${auth?.user.id}`,{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${auth?.token}`
			},
		})
		const jsonResponse = await response.json()

		if(!response.ok){
			throw new ZSAError('ERROR', jsonResponse.error)
		}
		return jsonResponse as { count : number }
	}catch(error){
		console.error('Error while counting processed quotes : ', (error as any).message)
		throw new ZSAError('ERROR', (error as any).message)
	}
});

/**
 * This is a simple action that returns the number of tasks for a project.
 */
export const projectTasksAction = createServerAction()
	.input(z.object({ projectId: z.string() }))
	.handler(async () => {
		// TODO implement this function
		await new Promise((resolve) => setTimeout(resolve, 5000));
		return { count: Math.ceil(Math.random() * 10) };
	});

/**
 * This is a simple action that returns the number of tasks for a project.
 */
export const QuotesServicesAction = createServerAction()
	.input(z.object({ quoteId: z.string() }))
	.handler(async () => {
		// TODO implement this function
		await new Promise((resolve) => setTimeout(resolve, 5000));
		return { count: Math.ceil(Math.random() * 10) };
	});

/**
 * This is a simple action that returns the progress of a project.
 */
export const progressProjectAction = createServerAction()
	.input(z.object({ projectId: z.string() }))
	.handler(async () => {
		// TODO implement this function
		await new Promise((resolve) => setTimeout(resolve, 5000));
		return { count: Math.ceil(Math.random() * 100) };
	});

/**
 * This is a simple action that returns the list of projects.
 */
export const getProjectsAction = createServerAction()
	.input(z.object({ limit: z.number()}))
	.handler<Promise<ProjectModel[]>>(async ({input}) => {
		
		try{
			const auth = await checkUserSession()
			const response = await fetch(`${process.env.API_URL}/project/client-projects/${auth?.user.id}?page=1&limit=${input.limit}&status=pending`,{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth?.token}`,
				}
			})
			const jsonResponse = await response.json()
			if(!response.ok){
				throw new ZSAError('ERROR', jsonResponse.error)
			}
			return jsonResponse
		}catch(error){
			console.error('Error while geting projects : ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message)
		}
	});

/**
 * This is a simple action that returns the list of quotes.
 */
export const getQuotesAction = createServerAction()
	.input(z.object({ limit: z.number()}))
	.handler<Promise<QuoteModel[]>>(async ({input}) => {
		try{
			const auth = await checkUserSession()
			const response = await fetch(`${process.env.API_URL}/quote/client/${auth?.user.id}/?page=1&limit=${input.limit}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth?.token}`,
				}
			})
			const jsonResponse = await response.json()
			if(!response.ok){
				throw new ZSAError('ERROR', jsonResponse.error)
			}
			return jsonResponse
		}catch(error){
			console.error('Error while geting quotes : ', (error as any).message)
			throw new ZSAError('ERROR', (error as any).message)
		}
	});
