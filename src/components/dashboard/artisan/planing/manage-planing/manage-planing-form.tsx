'use client';

import { Button } from '@/components/ui/button';
import { createPlaningAction } from '@src/actions/planing.actions';
import { PlaningModel, RangeModel } from '@src/helpers/models/planing.model';
import { RANGES_CONTENT } from '@src/helpers/util-functions';
import dayjs from 'dayjs';
import { Loader } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { CalendarPlaning, CalendarPlaningRef } from './calendar-planing';
import { RangeItem } from './range-item';

export const ManagePlaningForm: FC = () => {
	const calendarPlaningRef = useRef<CalendarPlaningRef>(null);

	const [planing, setPlaning] = useState<PlaningModel>();
	const [ranges, setRanges] = useState<RangeModel[]>([]);
	const [date, setDate] = useState<Date | undefined>(new Date());

	const { execute, isPending } = useServerAction(createPlaningAction, {
		onSuccess() {
			toast.success('Planing créé avec succès', { important: true });
			calendarPlaningRef.current?.refetch();
		},
		onError() {
			toast.error('Erreur lors de la création du planing', { important: true });
		},
	});

	const toggleItem = (operation: 'add' | 'remove', key: string, id?: string) => {
		if (operation === 'add') {
			setRanges((prev) => [
				...prev.map((range) => {
					if (range.key_id === key) {
						return { ...range, id };
					}
					return range;
				}),
			]);
		} else if (operation === 'remove') {
			setRanges((prev) => [
				...prev.map((range) => {
					if (range.key_id === key) {
						return { ...range, id: undefined };
					}
					return range;
				}),
			]);
		}
	};

	const save = () => {
		if (!date) {
			toast.warning('Veuillez sélectionner une date', { important: true });
			return;
		}

		if (dayjs(date).isBefore(dayjs(), 'day')) {
			toast.warning('Impossible de créer un planing pour une date passée', { important: true });
			return;
		}

		if (ranges.filter((item) => item.id).length === 0) {
			toast.warning('Veuillez sélectionner au moins une plage', { important: true });
			return;
		}

		execute({
			date: dayjs(date).format('YYYY-MM-DD'),
			ranges: ranges.filter((item) => item.id).map((range) => `${range.id}`),
		});
	};

	useEffect(() => {
		if (planing) {
			setRanges(
				RANGES_CONTENT.map((range) => {
					const id = planing.ranges.find((r) => r.key_id === range.key_id)?.id;
					return { ...range, id };
				})
			);
		} else setRanges(RANGES_CONTENT);
	}, [date, planing]);

	return (
		<div className='bg-card border rounded-xl p-5 space-y-5'>
			<div className='flex justify-between items-center'>
				<h2 className='text-lg font-medium text-foreground w-full'>Liste de rendez-vous</h2>
			</div>
			<div className='flex flex-col gap-6 lg:flex-row xl:gap-10'>
				<div className='w-full lg:w-auto flex-none'>
					<CalendarPlaning
						ref={calendarPlaningRef}
						date={date}
						onDateChange={(date, planing) => {
							setDate(date);
							setPlaning(planing);
						}}
					/>
				</div>
				<div className='w-full'>
					<h3 className='text-base font-medium mb-5'>Sélectionnez une plage pour les rendez-vous</h3>
					<div className='flex flex-wrap gap-3 mb-5'>
						{ranges.map((range) => (
							<RangeItem
								key={range.key_id}
								{...range}
								onChange={toggleItem}
								disabled={dayjs(date).isBefore(dayjs(), 'day')}
							/>
						))}
					</div>
					<Button
						disabled={dayjs(date).isBefore(dayjs(), 'day') || !date}
						onClick={save}
						className='rounded-full'
					>
						{isPending && <Loader className='mr-2 size-4 animate-spin' />}
						Enregistrer
					</Button>
				</div>
			</div>
		</div>
	);
};
