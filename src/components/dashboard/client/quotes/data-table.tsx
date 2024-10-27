"use client"
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { getQuotesAction } from "@src/actions/client.actions";
import { quotesTableColumns } from '@src/components/dashboard/client/quotes/colums';
import { TableLoader } from '@src/components/dashboard/table-loader';
import { EmptyContent } from '@src/components/empty-content';
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from 'next/navigation';
import * as React from 'react';

const columns = quotesTableColumns;

export default function QuotesTable({ isAll }: { isAll?: boolean }) {
  const router = useRouter();

  const { isPending, data = [] } = useServerActionQuery(getQuotesAction, {
	queryKey: ['get-quotes', isAll],
	input: { limit: isAll ? 10 : 10},
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
		<div className='bg-card border rounded-xl p-5 space-y-5'>
			<div className='flex justify-between items-center'>
				<h2 className='text-lg font-medium text-foreground w-full'>Liste des devis</h2>
				<Button variant={'outline'}>Comparer</Button>
			</div>
			<div className='rounded-lg overflow-hidden'>
				{isPending ? (
					<TableLoader cols={3} rows={4} />
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
										onClick={() => router.push(`/dashboard/quotes/${row.original.id}`)}
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
										<EmptyContent text='Pas de devis initialisé pour le moment !' />
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
