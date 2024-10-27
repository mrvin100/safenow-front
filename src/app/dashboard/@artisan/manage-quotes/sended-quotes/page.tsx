import { QuotesTable } from '@src/components/dashboard/artisan/quotes/sent-quotes/data-table';

export default async function Page() {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<QuotesTable />
		</div>
	);
}
