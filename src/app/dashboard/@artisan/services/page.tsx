import { ServiceList } from '@src/components/dashboard/artisan/services/service-list';

export default async function Page() {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<ServiceList />
		</div>
	);
}
