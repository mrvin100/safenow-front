'use client';

import { Button } from '@/components/ui/button';
import { TypographyH2, TypographyP } from '@/components/ui/typographies';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FC, useState } from 'react';
import { AppContainer, Spacer } from './../global';
import Link from 'next/link';

export const HomeTraction: FC = () => {
	const [steps] = useState<string[]>([
		'Créer un compte artisan en remplissant simplement un formulaire en moins de 1 minutes.',
		'Configuerer votre catalogue de services.',
		'Configuerer votre calendrier et c’est parti.',
	]);

	return (
		<section className={cn('bg-violet-800')}>
			<Spacer small />
			<AppContainer className={cn('flex flex-col lg:items-center lg:flex-row gap-10')}>
				<aside className='w-full space-y-5 text-white'>
					<TypographyH2>You are Govement or Organization ? <br /> Make yourself known.</TypographyH2>
					<TypographyP className='text-muted'>
                    SafeNow offers you the opportunity to propose your services and increase your turnover. So don&apos;t waste any more time, simply follow these key steps:
					</TypographyP>
					<ul className='space-y-5 text-muted'>
						{steps.map((step, i) => (
							<li key={i} className='flex gap-3'>
								<div
									className={cn(
										'size-10 lg:size-12 rounded-full bg-white text-foreground flex justify-center items-center',
										'flex-none text-2xl lg:text-4xl font-bold'
									)}
								>
									{i + 1}
								</div>
								<TypographyP>{step}</TypographyP>
							</li>
						))}
					</ul>
					<Button asChild><Link href={'/sign-up'}>Create your account</Link></Button>
				</aside>
				<Image
					alt='map image lof target market'
					height={500}
					width={500}
					className={cn('aspect-auto flex-none w-full lg:w-auto rounded-lg drop-shadow-md')}
					src={'/images/home-traction.png'}
				/>
			</AppContainer>
			<Spacer small />
		</section>
	);
};
