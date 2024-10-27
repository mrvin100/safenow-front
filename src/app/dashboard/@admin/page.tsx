import { cn } from '@/lib/utils';
import { ArtisanCount } from '@src/components/dashboard/admin/stats/artisan-count';
import { ClientCount } from '@src/components/dashboard/admin/stats/client-count';
import { CompletedProjectsCount } from '@src/components/dashboard/admin/stats/completed-project-count';
import { InitProjectsCount } from '@src/components/dashboard/admin/stats/init-project-count';
import { ProfessionCount } from '@src/components/dashboard/admin/stats/profession-count';
import { QuoteCount } from '@src/components/dashboard/admin/stats/quote-count';
import { TitleSection } from '@src/components/dashboard/title-section';

export default async function Page() {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<TitleSection title='Tableau de bord' />
			<div className={cn('grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8')}>
				<QuoteCount />
				<InitProjectsCount />
				<CompletedProjectsCount />
				<ArtisanCount />
				<ClientCount />
				<ProfessionCount />
			</div>
		</div>
	);
}
