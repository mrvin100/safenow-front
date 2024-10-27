import { RequestedQuotesTable } from '@src/components/dashboard/artisan/quotes/requested-quotes/data-table';

export default async function Page() {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<RequestedQuotesTable />
		</div>
	);
}
