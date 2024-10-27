
import {QuoteDetails} from '@src/components/dashboard/client/quotes/details/quote-details';
import { TitleSection } from '@src/components/dashboard/title-section';

export default async function Page({ params: { quoteId } }: { params: { quoteId: string } }) {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<TitleSection title='Détail du devi' withBackButton />
			<QuoteDetails quoteId={quoteId} />
		</div>
	);
}
