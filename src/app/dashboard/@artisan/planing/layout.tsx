import { Tabs } from '@src/components/dashboard/tabs';
import { TitleSection } from '@src/components/dashboard/title-section';
import { CalendarClock, CalendarCog } from 'lucide-react';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<TitleSection title='Mes planifications' />
			<Tabs
				baseUrl='/dashboard/planing'
				content={[
					{
						label: 'Mes rendez-vous',
						link: '/dashboard/planing',
						icon: <CalendarClock className='size-4' />,
					},
					{
						label: 'Mon planing',
						link: '/dashboard/planing/manage',
						icon: <CalendarCog className='size-4' />,
					},
				]}
			/>
			{children}
		</div>
	);
}
