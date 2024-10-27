import { redirect } from 'next/navigation';

export default function Page() {
	redirect('/dashboard/manage-quotes/requested-quotes');

	return null;
}
