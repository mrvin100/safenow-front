'use client';

import { Button } from '@/components/ui/button';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { getServicesAction } from '@src/actions/services.actions';
import { EmptyContent } from '@src/components/empty-content';
import { EditServiceModal, EditServiceModalRef } from '@src/components/modals/edit-service-modal';
import { FC, Fragment, useRef } from 'react';
import { TitleSection } from '../../title-section';
import { ServiceItem } from './service-item';
import { ServiceLoader } from './service-loader';

export type ServiceListProps = {};

export const ServiceList: FC<ServiceListProps> = ({}) => {
	const editServiceModalRef = useRef<EditServiceModalRef>(null);

	const {
		isLoading,
		data = [],
		refetch,
	} = useServerActionQuery(getServicesAction, {
		queryKey: ['get-services'],
		input: undefined,
	});

	return (
		<Fragment>
			<TitleSection
				title='Gestion des services'
				actionButton={
					<Button onClick={() => editServiceModalRef.current?.open()} className={'flex items-center gap-2'}>
						<span>Ajouter</span>
					</Button>
				}
			/>
			{isLoading ? (
				<ServiceLoader />
			) : data.length <= 0 ? (
				<EmptyContent
					actionContent={
						<Button onClick={() => editServiceModalRef.current?.open()}>Ajouter un service</Button>
					}
				/>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
					{data.map((item) => (
						<ServiceItem
							key={item.id}
							item={item}
							onDeleted={refetch}
							onEdit={() => editServiceModalRef.current?.open(item)}
						/>
					))}
				</div>
			)}
			<EditServiceModal ref={editServiceModalRef} onCompleted={() => refetch()} />
		</Fragment>
	);
};
