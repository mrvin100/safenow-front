'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TypographyH4 } from '@/components/ui/typographies';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { getInvitationsAction } from '@src/actions/collaborators.actions';
import { TableLoader } from '@src/components/dashboard/table-loader';
import { EmptyContent } from '@src/components/empty-content';
import { InvitationStatus } from '@src/helpers/models/invitation.model';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { invitationsTableColumns } from './columns';

const columns = invitationsTableColumns;

export const InvitationsTable = () => {
	const [page, setPage] = useState<number>(1);

	const { isLoading, data } = useServerActionQuery(getInvitationsAction, {
		queryKey: ['get-invitations', page],
		input: { limit: 10, page, status: InvitationStatus.PENDING },
	});

	const table = useReactTable({
		data: data?.content || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='bg-card border rounded-xl p-5 space-y-5'>
			<div className='flex justify-between items-center'>
				<TypographyH4 className='text-lg font-medium text-muted-foreground w-full'>
					Demandes de collaborations
				</TypographyH4>
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
										<EmptyContent text='Pas de demande enregistré pour le moment !' />
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
