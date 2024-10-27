'use client';

import { Button } from '@/components/ui/button';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { getProfessionsAction } from '@src/actions/professions.actions';
import { EmptyContent } from '@src/components/empty-content';
import { EditProfessionModal, EditProfessionModalRef } from '@src/components/modals/edit-profession-modal';
import { FC, Fragment, useRef } from 'react';
import { TitleSection } from '../../title-section';
import { ProfessionItem } from './profession-item';
import { ProfessionLoader } from './profession-loader';

export type ProfessionListProps = {};

export const ProfessionList: FC<ProfessionListProps> = ({}) => {
	const editProfessionModalRef = useRef<EditProfessionModalRef>(null);

	const {
		isLoading,
		data = [],
		refetch,
	} = useServerActionQuery(getProfessionsAction, {
		queryKey: ['get-professions'],
		input: undefined,
	});

	return (
		<Fragment>
			<TitleSection
				title='Gestion des professions'
				actionButton={
					<Button
						onClick={() => editProfessionModalRef.current?.open()}
						className={'flex items-center gap-2'}
					>
						<span>Ajouter</span>
					</Button>
				}
			/>
			{isLoading ? (
				<ProfessionLoader />
			) : data.length <= 0 ? (
				<EmptyContent
					actionContent={
						<Button onClick={() => editProfessionModalRef.current?.open()}>Créer une profession</Button>
					}
				/>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
					{data.map((item) => (
						<ProfessionItem
							key={item.id}
							item={item}
							onDeleted={refetch}
							onEdit={() => editProfessionModalRef.current?.open(item)}
						/>
					))}
				</div>
			)}
			<EditProfessionModal ref={editProfessionModalRef} onCompleted={() => refetch()} />
		</Fragment>
	);
};
