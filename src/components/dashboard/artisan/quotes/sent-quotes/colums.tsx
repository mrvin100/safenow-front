'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { QuoteModel } from '@src/helpers/models/quote.model';
import { formatCurrency } from '@src/helpers/util-functions';
import { ColumnDef } from '@tanstack/react-table';
import { FileText, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const quotesTableColumns: ColumnDef<QuoteModel>[] = [
	{
		accessorKey: 'label',
		header: 'Libelle',
	},
	{
		accessorKey: 'nb_service',
		header: 'Nb service',
	},
	{
		accessorKey: 'emitBy',
		header: 'Client',
	},
	{
		accessorKey: 'budget',
		header: 'Montant',
		cell: ({ row }) => (
			<div className='flex items-center'>
				<span className={cn('font-semibold')}>{formatCurrency(row.original.totalAmount)}</span>
			</div>
		),
	},
	{
		accessorKey: 'actions',
		header: '',
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' size='icon' className='rounded-full'>
							<MoreVerticalIcon className='size-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent sideOffset={5} alignOffset={5}>
						<CreateQuoteForm id={row.original.id} />
						<DropdownMenuItem className='text-destructive hover:text-destructive'>
							<Trash2Icon className='size-4 mr-2' />
							<span>Supprimer</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

const CreateQuoteForm = ({ id }: { id: string }) => {
	const router = useRouter();

	return (
		<DropdownMenuItem onClick={() => router.push(`/dashboard/manage-quotes/sended-quotes/edit-quote/${id}`)}>
			<FileText className='size-4 mr-2' />
			<span>Modifier le devis</span>
		</DropdownMenuItem>
	);
};
