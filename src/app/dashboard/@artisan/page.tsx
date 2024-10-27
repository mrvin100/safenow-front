import { cn } from '@/lib/utils';
import { ProjectsTable } from '@src/components/dashboard/artisan/projects/data-table';
import { CollaborationsCount } from '@src/components/dashboard/artisan/stats/collaboration-count';
import { InitProjectsCount } from '@src/components/dashboard/artisan/stats/init-project-count';
import { QuoteCount } from '@src/components/dashboard/artisan/stats/quote-count';
import { TitleSection } from '@src/components/dashboard/title-section';

export default async function Page() {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<TitleSection title='Tableau de bord' />
			<div className={cn('grid grid-cols-2 lg:grid-cols-3 gap-3 mb-3 md:gap-8 md:mb-8')}>
				<InitProjectsCount />
				<QuoteCount />
				<CollaborationsCount />
			</div>
			<ProjectsTable />
		</div>
	);
}
