import { ClientAccountsTable } from '@src/components/dashboard/admin/cleint-accounts/data-table';
import { TitleSection } from '@src/components/dashboard/title-section';

export default async function Page() {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<TitleSection title='Gestion comptes clients' />
			<ClientAccountsTable />
		</div>
	);
}