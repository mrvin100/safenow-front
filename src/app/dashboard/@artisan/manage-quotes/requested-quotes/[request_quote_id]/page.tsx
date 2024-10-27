import { RequestedQuotesDetails } from '@src/components/dashboard/artisan/quotes/request-quote-details';

export default async function Page({ params }: { params: { request_quote_id: string } }) {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<RequestedQuotesDetails requestedQuoteId={params.request_quote_id} />
		</div>
	);
}
