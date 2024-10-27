import { Skeleton } from '@/components/ui/skeleton';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { countProjectCollaboratorsAction } from '@src/actions/artisan.actions';
import { FC } from 'react';

export type CountProjectCollaboratorsProps = {
	projectId: string;
};

export const CountProjectCollaborators: FC<CountProjectCollaboratorsProps> = ({ projectId }) => {
	const { isLoading, data } = useServerActionQuery(countProjectCollaboratorsAction, {
		queryKey: ['count-project-collaborators', projectId],
		input: { projectId },
	});

	if (isLoading) return <Skeleton className='w-20 h-[20px]' />;

	return <div>{data?.count ?? '- - -'}</div>;
};
