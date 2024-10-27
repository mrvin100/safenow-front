import { PlaningModel } from '@src/helpers/models/planing.model';
import dayjs from 'dayjs';
import { FC, useMemo } from 'react';

export type AppointmentStatusProps = {
	planing: PlaningModel;
};

export const AppointmentStatus: FC<AppointmentStatusProps> = (props) => {
	const status: { label: string; bg: string } = useMemo(() => {
		// If date is after today, return 'A venir' with bg-gray-400
		if (dayjs(props.planing.date).isAfter(dayjs().format('YYYY-MM-DD'))) {
			return { label: 'A venir', bg: 'bg-gray-400' };
		}
		// If date is before today, return 'Passé' with bg-teal-500
		if (dayjs(props.planing.date).isBefore(dayjs().format('YYYY-MM-DD'))) {
			return { label: 'Passé', bg: 'bg-teal-500' };
		}
		// If date is today, return 'Aujourd'hui' with bg-orange-500
		return { label: "Aujourd'hui", bg: 'bg-orange-500' };
	}, [props.planing.date]);

	return (
		<div className='flex justify-start items-center whitespace-nowrap'>
			<div className={`px-4 py-1 rounded-full text-white text-xs font-medium ${status.bg}`}>{status.label}</div>
		</div>
	);
};
