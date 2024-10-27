'use client';

import { PreviewStatus } from '@src/components/dashboard/preview-status';
import { AppointmentModel } from '@src/helpers/models/appointment.model';
import { ColumnDef } from '@tanstack/react-table';

export const appointmentsTableColumns: ColumnDef<AppointmentModel>[] = [
	{
		accessorKey: 'planingId',
		header: 'Date du rendez-vous',
	},
	{
		accessorKey: 'emitBy',
		header: 'Artisan',
	},
	{
		accessorKey: 'answer',
		header: 'Réponse',
		cell: ({ row }) => <PreviewStatus status={row.original.status} />,
	},
	{
		accessorKey: 'status',
		header: 'Statut',
		cell: ({ row }) => <PreviewStatus status={row.original.status} />,
	},
];
