import { Tabs } from '@src/components/dashboard/tabs';
import { TitleSection } from '@src/components/dashboard/title-section';
import { NotebookText, SendToBackIcon } from 'lucide-react';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<TitleSection title='Gestion de devis' />
			<Tabs
				baseUrl='/dashboard/manage-quotes'
				content={[
					{
						label: 'Demande de devis',
						link: '/dashboard/manage-quotes/requested-quotes',
						icon: <NotebookText className='size-4' />,
					},
					{
						label: 'Devis envoyés',
						link: '/dashboard/manage-quotes/sended-quotes',
						icon: <SendToBackIcon className='size-4' />,
					},
				]}
			/>
			{children}
		</div>
	);
}
