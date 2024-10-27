'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { QuoteRequestModel } from '@src/helpers/models/quote.model';
import { formatCurrency } from '@src/helpers/util-functions';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon, FileText, MoreVerticalIcon, Trash2Icon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const requestedQuotesTableColumns: ColumnDef<QuoteRequestModel>[] = [
	{
		accessorKey: 'service',
		header: 'Service',
		cell: ({ row }) => (
			<div className={cn('line-clamp-2', { 'font-bold': !row.original.isRead })}>{row.original.service}</div>
		),
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => (
			<div className={cn('line-clamp-2', { 'font-bold': !row.original.isRead })}>{row.original.description}</div>
		),
	},
	{
		accessorKey: 'emitBy',
		header: 'Client',
		cell: ({ row }) => (
			<span className={cn({ 'font-bold': !row.original.isRead })}>
				{row.original.emitBy.firstName} {row.original.emitBy.lastName}
			</span>
		),
	},
	{
		accessorKey: 'budget',
		header: 'Budget',
		cell: ({ row }) => (
			<div className='flex items-center'>
				<span className={cn('font-semibold', { 'font-bold': !row.original.isRead })}>
					{formatCurrency(row.original.budget)}
				</span>
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
						<ViewQuoteButton id={row.original.id} />
						<CreateQuoteButton id={row.original.id} clientId={row.original.emitBy.id} />
						<DropdownMenuItem>
							<XIcon className='size-4 mr-2' />
							<span>Rejeter</span>
						</DropdownMenuItem>
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

const ViewQuoteButton = ({ id }: { id: string }) => {
	const router = useRouter();

	return (
		<DropdownMenuItem onClick={() => router.push(`/dashboard/manage-quotes/requested-quotes/${id}`)}>
			<EyeIcon className='size-4 mr-2' />
			<span>Consulter</span>
		</DropdownMenuItem>
	);
};

const CreateQuoteButton = ({ id, clientId }: { id: string; clientId: string }) => {
	const router = useRouter();

	return (
		<DropdownMenuItem
			onClick={() => router.push(`/dashboard/manage-quotes/requested-quotes/${id}/create-quote/${clientId}`)}
		>
			<FileText className='size-4 mr-2' />
			<span>Créer le devis</span>
		</DropdownMenuItem>
	);
};
