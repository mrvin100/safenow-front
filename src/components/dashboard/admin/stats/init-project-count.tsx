'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { cn } from '@/lib/utils';
import { countInitProjectsAction } from '@src/actions/admin.actions';
import { PackageIcon } from 'lucide-react';

export const InitProjectsCount = () => {
	const { isLoading, data } = useServerActionQuery(countInitProjectsAction, {
		queryKey: ['count-init-projects'],
		input: undefined,
	});

	return (
		<div className={cn('bg-card', 'border p-3 rounded-lg')}>
			<div className={cn('flex justify-between items-center')}>
				<div className={cn('text-base text-card-foreground', 'font-medium')}>Projets initiés</div>
				<PackageIcon className={cn('size-8 text-muted-foreground')} />
			</div>
			{isLoading ? (
				<Skeleton className='w-20 h-[32px] mt-1 mb-2' />
			) : (
				<div className={cn('text-foreground font-extrabold text-2xl pt-1 pb-2')}>{data?.count ?? '- - -'}</div>
			)}
			<div className={cn('text-xs text-muted-foreground')}>Nombre de projet initialisé</div>
		</div>
	);
};
