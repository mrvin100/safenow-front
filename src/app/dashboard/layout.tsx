// import { cn } from '@/lib/utils';
// import { DashboardNavbar } from '@src/components/dashboard/nav-bar';
// import { AuthProvider } from '@src/components/providers/auth.provider';
// import { Role } from '@src/helpers/models/user.model';
// import { getSession } from '@src/helpers/sessions';
// import { redirect } from 'next/navigation';
// import { ReactNode } from 'react';

// export default async function DashboardLayout({
// 	admin,
// 	artisan,
// 	client,
// }: {
// 	admin: ReactNode;
// 	artisan: ReactNode;
// 	client: ReactNode;
// }) {
// 	const auth = await getSession();

// 	if (!auth) {
// 		redirect('/sign-in');
// 	}
// 	return (
// 		<div className={cn('flex flex-col size-full')}>
// 			<AuthProvider auth={auth}>
// 				<DashboardNavbar />
// 				<div className={cn('dashboard-content')}>
// 					{auth.user?.role.toLowerCase() === Role.ADMIN.toLowerCase()
// 						? admin
// 						: auth.user?.role.toLowerCase() === Role.ARTISAN.toLowerCase()
// 						? artisan
// 						: auth.user?.role.toLowerCase() === Role.CLIENT.toLowerCase()
// 						? client
// 						: null}
// 				</div>
// 			</AuthProvider>
// 		</div>
// 	);
// }


import { cn } from '@/lib/utils';
import { DashboardNavbar } from '@src/components/dashboard/nav-bar';
import { AuthProvider } from '@src/components/providers/auth.provider';
import { Role } from '@src/helpers/models/user.model';
import { ReactNode } from 'react';

export default function DashboardLayout({
	admin,
	artisan,
	client,
}: {
	admin: ReactNode;
	artisan: ReactNode;
	client: ReactNode;
}) {
	// Suppression de la vérification de session
	// On définit un rôle par défaut comme "client"
	const auth = {
		user: {
			role: Role.CLIENT, // Rôle par défaut
		},
	};

	return (
		<div className={cn('flex flex-col size-full')}>
			{/* <AuthProvider auth={auth}> */}
				<DashboardNavbar />
				<div className={cn('dashboard-content')}>
					{auth.user.role.toLowerCase() === Role.ADMIN.toLowerCase()
						? admin
						: auth.user.role.toLowerCase() === Role.ARTISAN.toLowerCase()
						? artisan
						: client} 
				</div>
			{/* </AuthProvider> */}
		</div>
	);
}

