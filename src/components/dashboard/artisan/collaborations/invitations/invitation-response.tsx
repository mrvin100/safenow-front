import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { InvitationStatus } from '@src/helpers/models/invitation.model';
import { ChevronDown } from 'lucide-react';
import { FC } from 'react';

export type InvitationResponseProps = {
	status: InvitationStatus;
};

const invitationStatusLabels = {
	[InvitationStatus.ACCEPTED]: 'Accepté',
	[InvitationStatus.REFUSED]: 'Refusé',
	[InvitationStatus.PENDING]: 'En attente de réponse',
};

const invitationStatusTextColors = {
	[InvitationStatus.ACCEPTED]: 'text-green-500',
	[InvitationStatus.REFUSED]: 'text-red-500',
	[InvitationStatus.PENDING]: 'text-gray-500',
};

export const InvitationResponse: FC<InvitationResponseProps> = (props) => {
	// TODO : add a function to update the status of the invitation

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='flex whitespace-nowrap items-center gap-2 justify-start cursor-pointer'>
					<div className={cn(invitationStatusTextColors[props.status])}>
						{invitationStatusLabels[props.status]}
					</div>
					<ChevronDown className='size-4 text-muted-foreground' />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>{invitationStatusLabels[InvitationStatus.PENDING]}</DropdownMenuItem>
				<DropdownMenuItem>{invitationStatusLabels[InvitationStatus.ACCEPTED]}</DropdownMenuItem>
				<DropdownMenuItem>{invitationStatusLabels[InvitationStatus.REFUSED]}</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
