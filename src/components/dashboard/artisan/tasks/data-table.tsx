'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { SelectValue } from '@radix-ui/react-select';
import { getProjectTasksAction } from '@src/actions/projects.actions';
import { EmptyContent } from '@src/components/empty-content';
import { EditTaskModal, EditTaskModalRef } from '@src/components/modals/edit-task-modal';
import { TaskStatus } from '@src/helpers/models/task.model';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { PlusIcon } from 'lucide-react';
import { Fragment, useRef } from 'react';
import { TableLoader } from '../../table-loader';
import { taskTableColumns } from './colums';

const columns = taskTableColumns;

export const TasksTable = ({ projectId }: { projectId: string }) => {
	const editTaskModalRef = useRef<EditTaskModalRef>(null);

	const {
		isLoading,
		data = [],
		refetch,
	} = useServerActionQuery(getProjectTasksAction, {
		input: { projectId },
		queryKey: ['get-project-tasks', projectId],
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const addTask = () => {
		editTaskModalRef.current?.open(projectId);
	};

	return (
		<Fragment>
			<div className='bg-card border rounded-xl p-5 space-y-5'>
				<div className='flex justify-between items-center'>
					<h2 className='text-lg font-medium text-foreground'>Project 1</h2>
					<div className='flex gap-3 items-center'>
						<Button variant={'ghost'} size='sm' onClick={addTask}>
							<PlusIcon className='size-4 md:mr-2' />
							<span className='hidden md:inline-block'>Ajouter une tâche</span>
						</Button>
						<Select defaultValue='all'>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={'all'}>Tous les tâches</SelectItem>
								<SelectItem value={TaskStatus.COMPLETED}>Tâches terminés</SelectItem>
								<SelectItem value={TaskStatus.IN_COURSE}>Tâches en cours</SelectItem>
								<SelectItem value={TaskStatus.PENDING}>Tâches en attentes</SelectItem>
								<SelectItem value={TaskStatus.CANCELED}>Tâches annulés</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className='rounded-lg overflow-hidden'>
					{isLoading ? (
						<TableLoader />
					) : (
						<Table>
							<TableHeader className='bg-accent'>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header.id} className='text-foreground font-semibold'>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext()
														  )}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className='h-24 text-center'>
											<EmptyContent
												text='Ce project ne possède pas de tâche pour le moment !'
												actionContent={<Button onClick={addTask}>Créer une tâche</Button>}
											/>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					)}
				</div>
			</div>
			<EditTaskModal ref={editTaskModalRef} onCompleted={() => refetch()} />
		</Fragment>
	);
};
