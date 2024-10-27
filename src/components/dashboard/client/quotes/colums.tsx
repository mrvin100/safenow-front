'use client';

import { QuoteModel } from '@src/helpers/models/quote.model';
import { ColumnDef } from '@tanstack/react-table';
import { QuoteServices } from './quotes-services';

export const quotesTableColumns: ColumnDef<QuoteModel>[] = [
	{
		accessorKey: 'services',
		header: 'Libelle',
		cell: ({ row }) => <div>{row.original.services.map((service) => service.description).join(', ')}</div>,
	},
	{
		accessorKey: 'emitBy',
		header: 'Artisan',
	},
	{
		accessorKey: 'answer',
		header: 'Nb prestation',
		cell: ({ row }) => <QuoteServices quoteId={row.original.id} />,
	},
	{
		accessorKey: 'totalAmount',
		header: 'Montant',
	},
];

