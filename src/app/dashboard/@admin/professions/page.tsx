import { ProfessionList } from '@src/components/dashboard/admin/professions/profession-list';

export default async function Page() {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<ProfessionList />
		</div>
	);
}
