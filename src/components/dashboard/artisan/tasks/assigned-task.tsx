import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TypographyP } from '@/components/ui/typographies';
import { cn } from '@/lib/utils';
import { Role, UserModel } from '@src/helpers/models/user.model';
import { BoxIcon, Check, ChevronDown } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

export type AssignedTaskProps = {
	taskId?: string;
	assignedTo: string;
	readonly?: boolean;
	onChange?: (value: string) => void;
};

export const AssignedTask: FC<AssignedTaskProps> = ({ taskId, assignedTo, readonly, onChange }) => {
	const [user, setUser] = useState<UserModel>({
		id: 'id',
		email: 'john@doe.com',
		firstName: 'Roberthold',
		lastName: 'Loupugoun',
		phone: '1234567894',
		role: Role.ARTISAN,
		address: '123 rue de la paix',
		token: '',
		profileImage: '/avatars/main-avatar.jpg',
	});

	useEffect(() => {
		onChange?.(user.id);
	}, [onChange, user]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					disabled={readonly}
					variant={'ghost'}
					className='flex items-center gap-2 px-1 min-w-48 hover:bg-gray-200'
				>
					<span className='block size-8 rounded-full bg-gray-300 flex-none' />
					<span className='block font-medium w-full line-clamp-1 text-left'>
						{user.firstName} {user.lastName}
					</span>
					{!readonly && <ChevronDown className='size-4' />}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				style={{ width: 'var(--radix-popover-trigger-width)', minWidth: 300 }}
				align='start'
				className='w-full p-0'
			>
				<Command>
					<CommandInput placeholder='Saisissez un nom, email...' />
					<CommandList>
						<CommandEmpty>
							<div className='flex flex-col justify-center items-center p-5'>
								<BoxIcon className='size-12 text-muted-foreground' />
								<TypographyP className='text-center'>Pas d&apos;artisan trouvé.</TypographyP>
							</div>
						</CommandEmpty>
						<CommandGroup>
							{[].map((item) => (
								<CommandItem key={''}>
									<Check className={cn('mr-2 h-4 w-4')} />
									{'item.label'}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
