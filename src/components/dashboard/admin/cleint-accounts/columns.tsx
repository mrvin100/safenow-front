'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserModel } from '@src/helpers/models/user.model';
import { DEFAULT_AVATAR } from '@src/helpers/util-functions';
import { ColumnDef } from '@tanstack/react-table';
import { CircleOff, MoreVerticalIcon } from 'lucide-react';

export const clientAccountsColumns: ColumnDef<UserModel>[] = [
	{
		accessorKey: 'client',
		header: 'Nom du client',
		cell: ({ row }) => (
			<div className='flex gap-3 items-center'>
				<Avatar className='flex-none'>
					<AvatarImage src={row.original.profileImage || DEFAULT_AVATAR} className='object-cover' />
					<AvatarFallback>
						{`${row.original.firstName.charAt(0)}${row.original.lastName.charAt(0)}`}
					</AvatarFallback>
				</Avatar>
				<div>{`${row.original.firstName} ${row.original.lastName}`}</div>
			</div>
		),
	},
	{
		accessorKey: 'email',
		header: 'E-mail',
	},
	{
		accessorKey: 'phone',
		header: 'Téléphone',
	},
	{
		accessorKey: 'address',
		header: 'Adresse',
		cell: ({ row }) => row.original.address || '- - -',
	},
	{
		accessorKey: 'actions',
		header: '',
		cell: () => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' size='icon' className='rounded-full'>
						<MoreVerticalIcon className='size-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent sideOffset={5} alignOffset={5}>
					<DropdownMenuItem className='text-destructive hover:text-destructive'>
						<CircleOff className='size-4 mr-2' />
						<span>Bloquer</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	},
];
