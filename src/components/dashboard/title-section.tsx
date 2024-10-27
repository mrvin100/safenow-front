'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';

export type TitleSectionProps = {
	withBackButton?: boolean;
	title: string;
	actionButton?: ReactNode;
};

export const TitleSection: FC<TitleSectionProps> = (props) => {
	const router = useRouter();

	return (
		<div className={'flex items-center justify-between mb-5'}>
			<div className={cn('flex items-center gap-3')}>
				{props.withBackButton && (
					<Button variant={'outline'} size='icon' onClick={router.back} className={'rounded-full'}>
						<ArrowLeft className={'size-6'} />
					</Button>
				)}
				<h1 className={'text-xl font-medium'}>{props.title}</h1>
			</div>
			{props.actionButton}
		</div>
	);
};
