'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { getProjectsAction } from '@src/actions/projects.actions';
import { EmptyContent } from '@src/components/empty-content';
import { ProjectStatus } from '@src/helpers/models/project.model';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TableLoader } from '../../table-loader';
import { projectsTableColumns } from './columns';

// TODO add pagination

const columns = projectsTableColumns;

export const ProjectsTable = ({ isAll }: { isAll?: boolean }) => {
	const router = useRouter();

	const [status, setStatus] = useState<ProjectStatus | 'all'>('all');
	const [page, setPage] = useState<number>(1);

	const { isLoading, data: response } = useServerActionQuery(getProjectsAction, {
		queryKey: ['get-projects', isAll, page, status],
		input: { limit: isAll ? undefined : 10, page, status: status === 'all' ? undefined : status },
	});

	const table = useReactTable({
		data: response?.content || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='bg-card border rounded-xl p-5 space-y-5'>
			<div className='flex justify-between items-center'>
				<h2 className='text-lg font-medium text-foreground w-full'>Mes projets</h2>
				<Select value={status} onValueChange={(val: ProjectStatus | 'all') => setStatus(val)}>
					<SelectTrigger className='w-[200px]'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={'all'}>Tous les projects</SelectItem>
						<SelectItem value={ProjectStatus.COMPLETED}>Projects terminés</SelectItem>
						<SelectItem value={ProjectStatus.IN_COURSE}>Projects en cours</SelectItem>
						<SelectItem value={ProjectStatus.PENDING}>Projects en attentes</SelectItem>
						<SelectItem value={ProjectStatus.CANCELED}>Projects annulés</SelectItem>
					</SelectContent>
				</Select>
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
													: flexRender(header.column.columnDef.header, header.getContext())}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
										onClick={() => router.push(`/dashboard/projects/${row.original.id}`)}
									>
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
										<EmptyContent text='Pas de projet initialisé pour le moment !' />
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				)}
			</div>
		</div>
	);
};
