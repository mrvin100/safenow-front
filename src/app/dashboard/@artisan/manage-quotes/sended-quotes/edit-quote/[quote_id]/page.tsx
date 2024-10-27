import { CreateQuoteForm } from '@src/components/dashboard/artisan/quotes/create-quote-form';

export default async function Page({ params }: { params: { request_quote_id: string; clientId: string } }) {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<CreateQuoteForm requestedQuoteId={params.request_quote_id} clientId={params.clientId} />
		</div>
	);
}
