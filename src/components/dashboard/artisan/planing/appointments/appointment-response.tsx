import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { AppointmentStatus } from '@src/helpers/models/appointment.model';
import { ChevronDown } from 'lucide-react';
import { FC } from 'react';

export type AppointmentResponseProps = {
	status: AppointmentStatus;
};

const appointmentStatusLabels = {
	[AppointmentStatus.ACCEPTED]: 'Accepté',
	[AppointmentStatus.REFUSED]: 'Refusé',
	[AppointmentStatus.PENDING]: 'En attente de réponse',
};

const appointmentStatusTextColors = {
	[AppointmentStatus.ACCEPTED]: 'text-green-500',
	[AppointmentStatus.REFUSED]: 'text-red-500',
	[AppointmentStatus.PENDING]: 'text-gray-500',
};

export const AppointmentResponse: FC<AppointmentResponseProps> = (props) => {
	// TODO : add a function to update the status of the appointment

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='flex whitespace-nowrap items-center gap-2 justify-start cursor-pointer'>
					<div className={cn(appointmentStatusTextColors[props.status])}>
						{appointmentStatusLabels[props.status]}
					</div>
					<ChevronDown className='size-4 text-muted-foreground' />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>{appointmentStatusLabels[AppointmentStatus.PENDING]}</DropdownMenuItem>
				<DropdownMenuItem>{appointmentStatusLabels[AppointmentStatus.ACCEPTED]}</DropdownMenuItem>
				<DropdownMenuItem>{appointmentStatusLabels[AppointmentStatus.REFUSED]}</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
