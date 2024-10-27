import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { progressProjectAction } from '@src/actions/client.actions';
import { FC} from 'react';

export type ProgressionProjectProps = {
	projectId: string;
};

export const ProgressionProject: FC<ProgressionProjectProps> = ({ projectId }) => {
	const { isPending, data } = useServerActionQuery(progressProjectAction, {
		queryKey: ['progression-project'],
		input: {projectId: projectId},
	});

	if (isPending) return <Skeleton className='w-20 h-[20px]' />;

	return (
		<div className='flex items-center gap-2 text-primary font-medium'>
			<p className='flex-none text-xs'>{data?.count}%</p>
			<Progress color='primary' value={data?.count} className='h-[10px] rounded-full' />
		</div>
	);
};
