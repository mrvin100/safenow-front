"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { getProjectsAction } from "@src/actions/client.actions";
import { projectsTableColumns } from '@src/components/dashboard/client/projets/colums';
import { TableLoader } from '@src/components/dashboard/table-loader';
import { EmptyContent } from "@src/components/empty-content";
import { ProjectStatus } from '@src/helpers/models/project.model';
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from 'next/navigation';
import * as React from 'react';

const columns = projectsTableColumns

export default function ProjectsTable({ isAll }: { isAll?: boolean }) {
  const router = useRouter();

  const { isPending, data = [] } = useServerActionQuery(getProjectsAction, {
	queryKey: ['get-projets', isAll],
	input: { limit: isAll ? 10 : 10},
  });
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
		<div className='bg-card border rounded-xl p-5 space-y-5'>
			<div className='flex justify-between items-center'>
				<h2 className='text-lg font-medium text-foreground w-full'>Liste de projets</h2>
				<Select defaultValue='all'>
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
				{isPending ? (
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
}
