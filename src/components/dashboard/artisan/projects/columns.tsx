'use client';

import { PreviewStatus } from '@src/components/dashboard/preview-status';
import { ProjectModel } from '@src/helpers/models/project.model';
import { ColumnDef } from '@tanstack/react-table';
import { CountProjectCollaborators } from './count-project-collaborators';
import { CountProjectTask } from './count-project-task';
import { ProgressionProject } from './progression-project';

export const projectsTableColumns: ColumnDef<ProjectModel>[] = [
	{
		accessorKey: 'label',
		header: 'Projet',
	},
	{
		accessorKey: 'collaborators',
		header: 'Nb collaborateur',
		cell: ({ row }) => <CountProjectCollaborators projectId={row.original.id} />,
	},
	{
		accessorKey: 'tasks',
		header: 'Nb tâches',
		cell: ({ row }) => <CountProjectTask projectId={row.original.id} />,
	},
	{
		accessorKey: 'progress',
		header: 'Progression',
		cell: ({ row }) => <ProgressionProject projectId={row.original.id} />,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => <PreviewStatus status={row.original.status} />,
	},
];
