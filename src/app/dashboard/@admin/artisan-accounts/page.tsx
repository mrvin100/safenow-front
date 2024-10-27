import { ArtisanAccountsTable } from '@src/components/dashboard/admin/artisan-accounts/data-table';
import { TitleSection } from '@src/components/dashboard/title-section';

export default async function Page() {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<TitleSection title='Gestion comptes artisans' />
			<ArtisanAccountsTable />
		</div>
	);
}
