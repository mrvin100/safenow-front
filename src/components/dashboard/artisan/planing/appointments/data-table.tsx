'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { getArtisanAppointmentsAction } from '@src/actions/appoitments.actions';
import { TableLoader } from '@src/components/dashboard/table-loader';
import { EmptyContent } from '@src/components/empty-content';
import { AppointmentStatus } from '@src/helpers/models/appointment.model';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { appointmentTableColumns } from './colums';

const columns = appointmentTableColumns;

export const AppointmentsTable = () => {
	const [status, setStatus] = useState<AppointmentStatus | 'all'>('all');
	const [page, setPage] = useState<number>(1);

	const { isLoading, data } = useServerActionQuery(getArtisanAppointmentsAction, {
		queryKey: ['get-artisan-appointments', page, status],
		input: { limit: 10, page, status: status === 'all' ? undefined : status },
	});

	const table = useReactTable({
		data: data?.content || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='bg-card border rounded-xl p-5 space-y-5'>
			<div className='flex justify-between items-center'>
				<h2 className='text-lg font-medium text-foreground w-full'>Liste de rendez-vous</h2>
				<Select value={status} onValueChange={(val: AppointmentStatus | 'all') => setStatus(val)}>
					<SelectTrigger className='w-[250px]'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={'all'}>Tous les rendez-vous</SelectItem>
						<SelectItem value={AppointmentStatus.ACCEPTED}>Rendez-vous acceptés</SelectItem>
						<SelectItem value={AppointmentStatus.REFUSED}>Rendez-vous refusés</SelectItem>
						<SelectItem value={AppointmentStatus.PENDING}>Rendez-vous en attentes</SelectItem>
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
										<EmptyContent text='Pas de rendez-vous enregistré pour le moment !' />
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
