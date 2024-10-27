'use client';

import { Calendar } from '@/components/ui/calendar';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { cn } from '@/lib/utils';
import { getArtisanPlaningAction } from '@src/actions/planing.actions';
import { PlaningModel } from '@src/helpers/models/planing.model';
import dayjs from 'dayjs';
import { Loader } from 'lucide-react';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { DayProps, useDayRender } from 'react-day-picker';

export type CalendarPlaningRef = {
	refetch: () => void;
};

export type CalendarPlaningProps = {
	date?: Date;
	onDateChange: (date: Date | undefined, planing?: PlaningModel) => void;
};

export const CalendarPlaning = forwardRef<CalendarPlaningRef, CalendarPlaningProps>(({ date, onDateChange }, ref) => {
	const [month, setMonth] = useState<string>(dayjs(date).format('MM-YYYY'));

	const {
		isLoading,
		data = [],
		refetch,
	} = useServerActionQuery(getArtisanPlaningAction, {
		queryKey: ['get-artisan-planing', month],
		input: { month },
	});

	const handleDateSelected = (date: Date | undefined) => {
		const planing = data?.find((d) => dayjs(d.date).isSame(date, 'day'));
		onDateChange(date, planing);
	};

	useImperativeHandle(ref, () => ({
		refetch() {
			refetch();
		},
	}));

	useEffect(() => {
		if (data.length > 0) {
			const planing = data.find((d) => dayjs(d.date).isSame(date, 'day'));
			onDateChange(date, planing);
		}
	}, [data, date, onDateChange]);

	return (
		<div className='flex-none relative border rounded-lg'>
			<Calendar
				onMonthChange={(d) => setMonth(dayjs(d).format('MM-YYYY'))}
				mode='single'
				selected={date}
				onSelect={handleDateSelected}
				className='w-full lg:w-auto'
				components={{
					Day: (p) => {
						const isPlaning = !!data?.find((d) => dayjs(d.date).isSame(p.date, 'day'));
						return <DayButton dayProps={p} isPlaning={isPlaning} />;
					},
				}}
			/>
			{isLoading && (
				<div className='absolute inset-0 backdrop-blur bg-card/40 flex justify-center items-center rounded-lg z-50'>
					<Loader className='size-8 animate-spin text-muted-foreground' />
				</div>
			)}
		</div>
	);
});

CalendarPlaning.displayName = 'CalendarPlaning';

const DayButton = (props: { dayProps: DayProps; isPlaning: boolean }) => {
	const { dayProps, isPlaning } = props;

	const ref = React.useRef<HTMLButtonElement>(null);

	const render = useDayRender(dayProps.date, dayProps.displayMonth, ref);

	return (
		<button
			ref={ref}
			{...render.buttonProps}
			className={cn(render.buttonProps.className, {
				'border-2 border-orange-500': isPlaning,
				'bg-primary text-primary-foreground': render.activeModifiers.selected,
			})}
		/>
	);
};
