'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useServerActionQuery } from '@/hooks/use-server-actions';

import { getAppointmentsAction } from '@src/actions/appoitments.actions';
import { appointmentsTableColumns } from '@src/components/dashboard/client/appointments/colums';
import { TableLoader } from '@src/components/dashboard/table-loader';
import { EmptyContent } from '@src/components/empty-content';
import { AppointmentStatus } from '@src/helpers/models/appointment.model';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

const columns = appointmentsTableColumns;

export default function AppointmentsTable({ isAll }: { isAll?: boolean }) {
	const router = useRouter();
	const { isPending, data = [] } = useServerActionQuery(getAppointmentsAction, {
		queryKey: ['get-appointment', isAll],
		input: undefined,
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<div className='bg-card border rounded-xl p-5 space-y-5'>
			<div className='flex justify-between items-center'>
				<h2 className='text-lg font-medium text-foreground w-full'>Liste de rendez-vous</h2>
				<Select defaultValue='all'>
					<SelectTrigger className='w-[200px]'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={'all'}>Tous les rendez-vous</SelectItem>
						<SelectItem value={AppointmentStatus.ACCEPTED}>rendez-vous terminés</SelectItem>
						<SelectItem value={AppointmentStatus.PENDING}>rendez-vous en attentes</SelectItem>
						<SelectItem value={AppointmentStatus.REFUSED}>rendez-vous annulés</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className='rounded-lg overflow-hidden'>
				{isPending ? (
					<TableLoader cols={3} rows={3} />
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
										<EmptyContent text='Pas de rendez-vous initialisé pour le moment !' />
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
