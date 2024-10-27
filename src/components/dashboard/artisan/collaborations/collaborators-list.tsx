'use client';

import { Button } from '@/components/ui/button';
import { TypographyH4 } from '@/components/ui/typographies';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { getCollaboratorsAction } from '@src/actions/collaborators.actions';
import { EmptyContent } from '@src/components/empty-content';
import { FC, useMemo, useState } from 'react';
import { ServiceLoader } from '../services/service-loader';
import { CollaboratorItem } from './collaborator-item';

export const CollaboratorsList: FC = () => {
	const [page, setPage] = useState<number>(1);

	const { isLoading, data, refetch } = useServerActionQuery(getCollaboratorsAction, {
		queryKey: ['get-collaborators', page],
		input: { limit: 10, page },
	});

	const collaborators = useMemo(() => data?.content || [], [data]);

	return (
		<div className='space-y-5'>
			<div className='flex justify-between items-center'>
				<TypographyH4 className='text-lg font-medium text-muted-foreground w-full'>
					Mes collaborateurs
				</TypographyH4>
			</div>
			{isLoading ? (
				<ServiceLoader />
			) : collaborators.length <= 0 ? (
				<EmptyContent actionContent={<Button onClick={() => {}}>Inviter un collaborateur</Button>} />
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
					{collaborators.map((item) => (
						<CollaboratorItem key={item.id} item={item} onDeleted={refetch} />
					))}
				</div>
			)}
		</div>
	);
};
