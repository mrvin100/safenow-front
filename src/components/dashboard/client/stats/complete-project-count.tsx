'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { cn } from '@/lib/utils';
import { countCompleteProjectsAction } from '@src/actions/client.actions';
import { PackageCheck } from 'lucide-react';

export const CompleteProjectsCount = () => {
	const { isLoading, data } = useServerActionQuery(countCompleteProjectsAction,{
		queryKey: ['count-completeprojects'],
		input: undefined,
	});
	
	return (
		<div className={cn('bg-card', 'border p-3 rounded-lg')}>
			<div className={cn('flex justify-between items-center')}>
				<div className={cn('text-base text-card-foreground', 'font-medium')}>Projets terminés</div>
				<PackageCheck className={cn('size-8 text-muted-foreground')} />
			</div>
			{isLoading ? (
				<Skeleton className='w-20 h-[32px] mt-1 mb-2' />
			) : (
				<div className={cn('text-foreground font-extrabold text-2xl pt-1 pb-2')}>{data?.count ?? '- - -'}</div>
			)}
			<div className={cn('text-xs text-muted-foreground')}>Nombre de projet  finalisé</div>
		</div>
	);
};
