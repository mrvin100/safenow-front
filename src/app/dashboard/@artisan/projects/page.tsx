import { ProjectsTable } from '@src/components/dashboard/artisan/projects/data-table';
import { TitleSection } from '@src/components/dashboard/title-section';

export default async function Page() {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<TitleSection title='Gestion de projets' />
			<ProjectsTable isAll />
		</div>
	);
}
