'use client';

import { InvitationModel } from '@src/helpers/models/invitation.model';
import { ColumnDef } from '@tanstack/react-table';
import { InvitationResponse } from './invitation-response';

export const invitationsTableColumns: ColumnDef<InvitationModel>[] = [
	{
		accessorKey: 'artisan',
		header: 'Collaborateur',
	},
	{
		accessorKey: 'profession',
		header: 'Métier',
	},
	{
		accessorKey: 'address',
		header: 'Adresse',
	},
	{
		accessorKey: 'status',
		header: 'Réponse',
		cell: ({ row }) => <InvitationResponse status={row.original.status} />,
	},
];
