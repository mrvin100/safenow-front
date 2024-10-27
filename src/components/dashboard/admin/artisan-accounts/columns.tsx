'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArtisanModel } from '@src/helpers/models/artisan.model';
import { DEFAULT_AVATAR } from '@src/helpers/util-functions';
import { ColumnDef } from '@tanstack/react-table';
import { CircleOff, FileText, MoreVerticalIcon } from 'lucide-react';

export const artisanAccountsColumns: ColumnDef<ArtisanModel>[] = [
	{
		accessorKey: 'artisan',
		header: "Nom de l'artisan",
		cell: ({ row }) => (
			<div className='flex gap-3 items-center'>
				<Avatar className='flex-none'>
					<AvatarImage src={row.original.userId.profileImage || DEFAULT_AVATAR} className='object-cover' />
					<AvatarFallback>
						{`${row.original.userId.firstName.charAt(0)}${row.original.userId.lastName.charAt(0)}`}
					</AvatarFallback>
				</Avatar>
				<div>{`${row.original.userId.firstName} ${row.original.userId.lastName}`}</div>
			</div>
		),
	},
	{
		accessorKey: 'email',
		header: 'E-mail',
		cell: ({ row }) => row.original.userId.email,
	},
	{
		accessorKey: 'phone',
		header: 'Téléphone',
		cell: ({ row }) => row.original.userId.phone,
	},
	{
		accessorKey: 'city',
		header: 'Ville',
	},
	{
		accessorKey: 'profession',
		header: 'Profession',
		cell: ({ row }) => row.original.profession?.label || '- - -',
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
					<DropdownMenuItem>
						<FileText className='size-4 mr-2' />
						<span>Consulter</span>
					</DropdownMenuItem>
					<DropdownMenuItem className='text-destructive hover:text-destructive'>
						<CircleOff className='size-4 mr-2' />
						<span>Bloquer</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	},
];
