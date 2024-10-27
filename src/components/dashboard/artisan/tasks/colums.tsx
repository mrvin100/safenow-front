'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TaskModel } from '@src/helpers/models/task.model';
import { ColumnDef } from '@tanstack/react-table';
import { EditIcon, EyeIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { PreviewStatus } from '../../preview-status';
import { AssignedTask } from './assigned-task';
import { Tags } from './tags';

export const taskTableColumns: ColumnDef<TaskModel>[] = [
	{
		accessorKey: 'task',
		header: 'Tâche',
		cell: ({ row }) => <div className='whitespace-nowrap'>{row.original.body}</div>,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => <div className='line-clamp-2'>{row.original.description}</div>,
	},
	{
		accessorKey: 'assignTo',
		header: 'Assigné à',
		cell: ({ row }) => <AssignedTask taskId={row.original.id} assignedTo={row.original.asignTo} />,
	},
	{
		accessorKey: 'tags',
		header: 'Tags',
		cell: ({ row }) => <Tags content={row.original.tags} />,
	},
	{
		accessorKey: 'status',
		header: 'État',
		cell: ({ row }) => <PreviewStatus status={row.original.status} />,
	},
	{
		accessorKey: 'actions',
		header: '',
		cell: () => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' size='icon' className='rounded-full'>
						<MoreVerticalIcon className='size-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent sideOffset={5} alignOffset={5}>
					<DropdownMenuItem>
						<EyeIcon className='size-4 mr-2' />
						<span>Voir plus</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<EditIcon className='size-4 mr-2' />
						<span>Modifier</span>
					</DropdownMenuItem>
					<DropdownMenuItem className='text-destructive hover:text-destructive'>
						<Trash2Icon className='size-4 mr-2' />
						<span>Supprimer</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	},
];
