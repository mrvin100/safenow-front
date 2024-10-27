'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { PowerIcon } from '@heroicons/react/24/solid';
import { Role } from '@src/helpers/models/user.model';
import { ADMIN_ROUTES, ARTISAN_ROUTES, USER_ROUTES } from '@src/helpers/routes';
import { openConfirmModal } from '@src/helpers/stores/confirm-modal-store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useAuthContext } from '@src/components/providers/auth.provider';

type Props = {
	onItemClick?: () => void;
	isAdmin?: boolean;
};

export const DashboardSidebar = ({ onItemClick }: Props) => {
	const {
		auth: { user },
		logout,
	} = useAuthContext();
	const path = usePathname();

	const routes = useMemo(
		() => (user?.role === Role.ADMIN ? ADMIN_ROUTES : user?.role === Role.ARTISAN ? ARTISAN_ROUTES : USER_ROUTES),
		[user]
	);

	const isCurrentRoute = (route: string) => {
		if (route === path && path === '/dashboard') return true;

		if (route === '/dashboard') return false;

		return path.includes(route);
	};

	const handleSignOut = () => {
		onItemClick?.();
		openConfirmModal(
			"Voulez-vous vraiment vous déconnecter de cette application ? Vous ne n'aurez plus accès à l'ensemble des opérations effectuées par ce compte.",
			logout
		);
	};

	return (
		<aside className={'w-full md:w-[280px] bg-card h-full flex flex-col'}>
			<ScrollArea className='size-full'>
				<div className={cn('space-y-3 overflow-auto py-5 md:px-4')}>
					{routes.map((item) => (
						<Link key={item.label} href={item.link} className={'block'}>
							<button
								onClick={onItemClick}
								className={cn(
									'w-full border border-muted rounded-md px-3 py-2',
									'flex justify-start items-center gap-3 text-left',
									'text-muted-foreground transition-all duration-300',
									isCurrentRoute(item.link)
										? 'text-white bg-primary'
										: 'hover:bg-muted hover:text-primary'
								)}
							>
								{item.icon}
								<span className={'block text-base line-clamp-1'}>{item.label}</span>
							</button>
						</Link>
					))}
				</div>
			</ScrollArea>
			<div className='flex-none pt-5 pb-20 md:pb-5  md:px-4'>
				<button
					style={{ color: 'rgb(239 68 68)' }}
					onClick={handleSignOut}
					className={cn(
						'w-full border border-muted rounded-md px-3 py-2',
						'flex justify-start items-center gap-3',
						'text-destructive-foreground transition-all duration-300',
						'hover:bg-destructive/20'
					)}
				>
					<PowerIcon className={'size-6'} />
					<span className={'block'}>Déconnexion</span>
				</button>
			</div>
		</aside>
	);
};
