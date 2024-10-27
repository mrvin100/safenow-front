import { Skeleton } from '@/components/ui/skeleton';
import { FC, useState } from 'react';

export const ProfessionLoader: FC = () => {
	const [content] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
			{content.map((_, index) => (
				<div key={`${index}-skeleton`} className='bg-card border rounded-xl p-3 flex gap-3'>
					<Skeleton className='w-16 flex-none h-16 rounded-md' />
					<div className='space-y-2 w-full'>
						<Skeleton className='w-full h-6 mb-2' />
						<Skeleton className='h-3 w-full' />
						<Skeleton className='h-3 w-1/2' />
					</div>
				</div>
			))}
		</div>
	);
};
