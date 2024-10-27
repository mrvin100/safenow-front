import { TasksTable } from '@src/components/dashboard/artisan/tasks/data-table';
import { TitleSection } from '@src/components/dashboard/title-section';

export default async function Page({ params: { projectid } }: { params: { projectid: string } }) {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<TitleSection title='Gestion de projets' withBackButton />
			<TasksTable projectId={projectid} />
		</div>
	);
}
