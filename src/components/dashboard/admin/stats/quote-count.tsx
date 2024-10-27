'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { cn } from '@/lib/utils';
import { countQuoteAction } from '@src/actions/admin.actions';
import { NotepadText } from 'lucide-react';

export const QuoteCount = () => {
	const { isLoading, data } = useServerActionQuery(countQuoteAction, {
		queryKey: ['count-quote'],
		input: undefined,
	});

	return (
		<div className={cn('bg-card', 'border p-3 rounded-lg')}>
			<div className={cn('flex justify-between items-center')}>
				<div className={cn('text-base text-card-foreground', 'font-medium')}>Devis</div>
				<NotepadText className={cn('size-8 text-muted-foreground')} />
			</div>
			{isLoading ? (
				<Skeleton className='w-20 h-[32px] mt-1 mb-2' />
			) : (
				<div className={cn('text-foreground font-extrabold text-2xl pt-1 pb-2')}>{data?.count ?? '- - -'}</div>
			)}
			<div className={cn('text-xs text-muted-foreground')}>Nombre de devis générés</div>
		</div>
	);
};
