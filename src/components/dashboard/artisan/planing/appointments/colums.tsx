'use client';

import { AppointmentModel } from '@src/helpers/models/appointment.model';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { AppointmentResponse } from './appointment-response';
import { AppointmentStatus } from './appointment-status';

export const appointmentTableColumns: ColumnDef<AppointmentModel>[] = [
	{
		accessorKey: 'date',
		header: 'Date du rendez-vous',
		cell: ({ row }) => {
			const planingDate = new Date(row.original.planingId.date);
			// return like 12 Mars 2024 à partir de 13h30
			return (
				<div className='flex flex-col whitespace-nowrap'>
					{dayjs(planingDate).format('DD MMM YYYY')} à partir de {row.original.planingId.ranges[0].start} -{' '}
					{row.original.planingId.ranges[0].end}
				</div>
			);
		},
	},
	{
		accessorKey: 'emitTo',
		header: 'Artisan',
	},
	{
		accessorKey: 'address',
		header: 'Adresse',
		cell: ({ row }) => <div className='flex flex-col whitespace-nowrap'>La rue de l&apos;artisan, 75000 Paris</div>,
	},
	{
		accessorKey: 'response',
		header: 'Réponse',
		cell: ({ row }) => <AppointmentResponse status={row.original.status} />,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => <AppointmentStatus planing={row.original.planingId} />,
	},
];
