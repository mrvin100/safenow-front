import { cn } from '@/lib/utils';
import { DashboardSidebar } from '@src/components/dashboard/sidebar';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'Tableau de bord (Dashboard) | Mappeos',
	description: 'Tableau de bord (Dashboard) de Mappeos',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<div className={cn('flex size-full')}>
			<div className={cn('flex-none', 'hidden md:block', 'border-r')}>
				<DashboardSidebar />
			</div>
			<div className={cn('size-full bg-muted overflow-y-auto')}>
				<div className={cn('p-4 md:p-8')}>{children}</div>
			</div>
		</div>
	);
}
