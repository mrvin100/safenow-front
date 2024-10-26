'use client';

import { TypographyBlockquote, TypographyP } from '@/components/ui/typographies';
import { cn } from '@/lib/utils';
import { FC, useState } from 'react';
import { AppContainer } from './../global';

export const HomeCounters: FC = () => {
	const [counters] = useState<{ value: number; description: string }[]>([
		{
			value: 50,
			description: 'Entreprises enregistrés',
		},
		{
			value: 123,
			description: 'Particulier prestataires',
		},
		{
			value: 503,
			description: 'Services disponibles',
		},
		{
			value: 1023,
			description: 'Traitements devis',
		},
	]);

	return (
		<section className='counter-bg'>
			<div className={cn('bg-violet-800')}>
				<AppContainer
					className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-20')}
				>
					{counters.map((counter) => (
						<CountItem key={counter.description} {...counter} />
					))}
				</AppContainer>
			</div>
		</section>
	);
};

const CountItem = ({ value, description }: { value: number; description: string }) => {
	return (
		<div className='text-muted'>
			<TypographyP className='text-5xl lg:text-7xl font-extrabold'>{value}+</TypographyP>
			<TypographyBlockquote className='text-xl lg:text-2xl'>{description}</TypographyBlockquote>
		</div>
	);
};
