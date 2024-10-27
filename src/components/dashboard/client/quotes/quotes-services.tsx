import { Skeleton } from '@/components/ui/skeleton';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { QuotesServicesAction } from '@src/actions/client.actions';
import { FC} from 'react';

export type QuoteServicesProps = {
	quoteId: string;
};

export const QuoteServices: FC<QuoteServicesProps> = ({ quoteId }) => {
	const {isPending, data } = useServerActionQuery(QuotesServicesAction, {
		queryKey: ['quote-services'],
		input: {quoteId: quoteId},
	});

	if (isPending) return <Skeleton className='w-20 h-[20px]' />;

	return <div>{data?.count ?? '- - -'}</div>;
};
