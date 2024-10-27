'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TypographyP } from '@/components/ui/typographies';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { cn } from '@/lib/utils';
import { getRequestedQuoteById } from '@src/actions/quotes.actions';
import { EmptyContent } from '@src/components/empty-content';
import { formatCurrency } from '@src/helpers/util-functions';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import localization from 'dayjs/plugin/localizedFormat';
import { ArrowLeftIcon, FileText, Loader, Trash2Icon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

dayjs.locale('fr');
dayjs.extend(localization);

type Props = {
	requestedQuoteId: string;
};

export const RequestedQuotesDetails = ({ requestedQuoteId }: Props) => {
	const router = useRouter();

	const { isLoading, data } = useServerActionQuery(getRequestedQuoteById, {
		input: { requestedQuoteId },
		queryKey: ['get-requested-quote', requestedQuoteId],
	});

	return (
		<div className='bg-card border rounded-xl p-5 space-y-5'>
			<div className='flex justify-between items-center'>
				<div className='flex gap-2 items-center'>
					<Button variant={'outline'} size={'icon'} onClick={router.back} className='rounded-full'>
						<ArrowLeftIcon className='size-6' />
					</Button>
					<h2 className='text-lg font-medium text-foreground'>Details de la demande</h2>
				</div>
				<div className='flex'>
					<Button
						disabled={isLoading}
						variant={'ghost'}
						size='sm'
						onClick={() =>
							router.push(
								`/dashboard/manage-quotes/requested-quotes/${data?.id}/create-quote/${data?.emitBy.id}`
							)
						}
					>
						<FileText className='size-4 mr-2' />
						<span>Créer un devis</span>
					</Button>
					<Button disabled={isLoading} variant={'ghost'} size='sm'>
						<XIcon className='size-4 mr-2' />
						<span>Rejeter</span>
					</Button>
					<Button disabled={isLoading} variant={'ghost'} size='sm' className='text-destructive'>
						<Trash2Icon className='size-4 mr-2' />
						<span>Supprimer</span>
					</Button>
				</div>
			</div>

			{isLoading ? (
				<div className={cn('flex justify-center items-center min-h-40')}>
					<Loader className='size-10 text-primary' />
				</div>
			) : !data ? (
				<EmptyContent text="Cette demande dont vous souhaitez voir le details n'existe pas !" />
			) : (
				<Fragment>
					<div className=''>
						<Label className='text-muted-foreground'>Service</Label>
						<TypographyP>{data.service}</TypographyP>
					</div>
					<div className=''>
						<Label className='text-muted-foreground'>Description</Label>
						<TypographyP>{data.description}</TypographyP>
					</div>
					<div className='flex gap-10'>
						<div className=''>
							<Label className='text-muted-foreground'>Budget</Label>
							<TypographyP>{formatCurrency(data.budget)}</TypographyP>
						</div>
						<div className=''>
							<Label className='text-muted-foreground'>Emit le</Label>
							<TypographyP className='capitalize'>{dayjs(data.createdAt).format('lll')}</TypographyP>
						</div>
					</div>
					<div className=''>
						<Label className='text-muted-foreground'>Client</Label>
						<TypographyP>
							{data.emitBy.firstName} {data.emitBy.lastName}
						</TypographyP>
					</div>
				</Fragment>
			)}
		</div>
	);
};
