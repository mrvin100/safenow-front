'use server';

import { taskSchema } from '@src/helpers/form-schemas/task-schema';
import { ProjectModel, ProjectStatus } from '@src/helpers/models/project.model';
import { TaskModel, TaskStatus } from '@src/helpers/models/task.model';
import { checkUserSession } from '@src/helpers/sessions';
import { getQueryParams } from '@src/helpers/util-functions';
import { ResponseCollectionType } from '@src/helpers/util-types';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

/**
 * This is a simple action that returns the progress of a project.
 */
export const progressProjectAction = createServerAction()
	.input(z.object({ projectId: z.string() }))
	.handler(async () => {
		// TODO implement this function
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return { count: Math.ceil(Math.random() * 100) };
	});

/**
 * This is a simple action that returns the list of projects.
 */
export const getProjectsAction = createServerAction()
	.input(
		z.object({
			limit: z.optional(z.number()),
			page: z.optional(z.number()),
			status: z.optional(z.nativeEnum(ProjectStatus)),
		})
	)
	.handler<Promise<ResponseCollectionType<ProjectModel[]>>>(async ({ input }) => {
		try {
			const auth = await checkUserSession();
			let query = getQueryParams(input);

			const url = `${process.env.API_URL}/project/artisan/${auth.user.id}${query}`;

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

/**
 * This is a simple action that returns the list of project tasks.
 */
export const getProjectTasksAction = createServerAction()
	.input(z.object({ projectId: z.string() }))
	.handler<Promise<TaskModel[]>>(async () => {
		// TODO implement this function
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return [
			{
				id: '1',
				body: 'Assisting guests with checking in',
				description:
					'Description 1: Cette tâche implique la réparation de la plomberie dans la salle de bain principale. Il est nécessaire de remplacer les tuyaux endommagés et de vérifier les fuites potentielles.',
				asignTo: 'Artisan 1',
				tags: ['tag 1', 'tag 2', 'tag 3'],
				status: TaskStatus.CANCELED,
			},
			{
				id: '2',
				body: 'Cleaning',
				description:
					"Description 2: Cette tâche consiste à installer un nouveau système de chauffage dans le salon. L'artisan doit s'assurer que le système est correctement configuré et fonctionne efficacement.",
				asignTo: 'Artisan 2',
				tags: ['tag 2', 'tag 2', 'tag 3'],
				status: TaskStatus.PENDING,
			},
			{
				id: '3',
				body: 'TServing food to guests',
				description:
					"Description 3: Cette tâche concerne la peinture des murs extérieurs de la maison. L'artisan doit préparer les surfaces, appliquer une sous-couche et ensuite peindre avec la couleur choisie.",
				asignTo: 'Artisan 3',
				tags: ['tag 3', 'tag 2', 'tag 3'],
				status: TaskStatus.COMPLETED,
			},
			{
				id: '4',
				body: 'Dusting surfaces',
				description:
					"Description 4: Cette tâche implique l'installation de nouveaux luminaires dans la cuisine. L'artisan doit s'assurer que les luminaires sont correctement installés et que le câblage électrique est sécurisé.",
				asignTo: 'Artisan 4',
				tags: ['tag 4', 'tag 2', 'tag 3'],
				status: TaskStatus.IN_COURSE,
			},
		] as TaskModel[];
	});

/**
 * This is a simple action that creates a new task.
 */
export const createTaskAction = createServerAction()
	.input(taskSchema)
	.handler(async ({ input }) => {
		// TODO implement this function
		await new Promise((resolve) => setTimeout(resolve, 1000));

		return input;
	});
