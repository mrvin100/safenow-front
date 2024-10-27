import { CollaboratorsList } from '@src/components/dashboard/artisan/collaborations/collaborators-list';
import { InvitationsTable } from '@src/components/dashboard/artisan/collaborations/invitations/data-table';
import { TitleSection } from '@src/components/dashboard/title-section';
import { Spacer } from '@src/components/global';

export default async function Page() {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<TitleSection title='Gestion de collaborations' />
			<InvitationsTable />
			<Spacer extraSmall />
			<CollaboratorsList />
		</div>
	);
}
