import { Skeleton } from '@/components/ui/skeleton';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { projectTasksAction } from '@src/actions/client.actions';
import { FC } from 'react';

export type ProjectTaskProps = {
	projectId: string;
};

export const CountProjectTask: FC<ProjectTaskProps> = ({ projectId }) => {
	const { isPending, data } = useServerActionQuery(projectTasksAction, {
		queryKey: ['count-projects-tasks'],
		input: {projectId: projectId},
	});

	if (isPending) return <Skeleton className='w-20 h-[20px]' />;

	return <div>{data?.count ?? '- - -'}</div>;
};
