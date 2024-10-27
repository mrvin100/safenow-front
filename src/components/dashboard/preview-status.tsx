import { cn } from '@/lib/utils';
import { AppointmentStatus } from '@src/helpers/models/appointment.model';
import { ProjectStatus } from '@src/helpers/models/project.model';
import { TaskStatus } from '@src/helpers/models/task.model';
import { FC, useMemo } from 'react';

export type PreviewStatusProps = {
	status: ProjectStatus | TaskStatus | AppointmentStatus;
};

export const PreviewStatus: FC<PreviewStatusProps> = (props) => {
	const options = useMemo<{ label: string; bg: string } | null>(() => {
		switch (props.status) {
			// For projects
			case ProjectStatus.CANCELED:
				return { label: 'Annulé', bg: 'bg-destructive' };
			case ProjectStatus.COMPLETED:
				return { label: 'Terminé', bg: 'bg-teal-500' };
			case ProjectStatus.IN_COURSE:
				return { label: 'En cours', bg: 'bg-orange-500' };
			case ProjectStatus.PENDING:
				return { label: 'En attente', bg: 'bg-gray-400' };
			// For tasks
			case TaskStatus.CANCELED:
				return { label: 'Annulé', bg: 'bg-destructive' };
			case TaskStatus.COMPLETED:
				return { label: 'Terminé', bg: 'bg-teal-500' };
			case TaskStatus.IN_COURSE:
				return { label: 'En cours', bg: 'bg-orange-500' };
			case TaskStatus.PENDING:
				return { label: 'En attente', bg: 'bg-gray-400' };
			// For Quotes
			case AppointmentStatus.PENDING:
				return { label: 'En attente de réponse', bg: 'text-gray-500' };
			case AppointmentStatus.ACCEPTED:
				return { label: 'Accepté', bg: 'text-teal-500' };
			case AppointmentStatus.REFUSED:
				return { label: 'Refusé', bg: 'text-destructive' };
			default:
				return null;
		}
	}, [props.status]);

	if (!options) return null;

	return (
		<div className='flex justify-start items-center whitespace-nowrap'>
			<div className={cn('px-4 py-1 rounded-full text-white text-xs font-medium', options.bg)}>
				{options.label}
			</div>
		</div>
	);
};
