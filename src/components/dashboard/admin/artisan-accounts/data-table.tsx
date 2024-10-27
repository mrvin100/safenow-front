'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { getArtisanAccountsAction } from '@src/actions/admin.actions';
import { EmptyContent } from '@src/components/empty-content';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { TableLoader } from '../../table-loader';
import { artisanAccountsColumns } from './columns';

// TODO add pagination

const columns = artisanAccountsColumns;

export const ArtisanAccountsTable = () => {
	const { isLoading, data } = useServerActionQuery(getArtisanAccountsAction, {
		input: undefined,
		queryKey: ['get-artisan-accounts'],
	});

	const table = useReactTable({
		data: data?.content || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='bg-card border rounded-xl p-5 space-y-5'>
			<div className='flex justify-between items-center'>
				<h2 className='text-lg font-medium text-foreground'>Liste des artisans</h2>
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
										<EmptyContent text={"Pas encore d'artisan inscrit pour le moment !"} />
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
