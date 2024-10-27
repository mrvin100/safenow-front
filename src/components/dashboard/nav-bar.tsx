'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { UserModel } from '@src/helpers/models/user.model';
import { DEFAULT_AVATAR } from '@src/helpers/util-functions';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useAuthContext } from '@src/components/providers/auth.provider';
import { DashboardSidebar } from './sidebar';

export const DashboardNavbar = () => {
	const {
		auth: { user },
	} = useAuthContext();

	const src = useMemo(() => {
		if (user?.profileImage) return `${user?.profileImage}`;
		return DEFAULT_AVATAR;
	}, [user?.profileImage]);

	return (
		<header className={cn('flex items-center justify-between', 'bg-card p-3 md:p-5', 'border-b flex-none')}>
			<Link href='/' className='h-10'>
				<div className='h-10 w-24 bg-gray-200' />
			</Link>
			<div className={cn('flex items-center gap-3 md:gap-5')}>
				<PhoneNav user={user} src={src} />
				<div className={cn('hidden gap-3 items-center', 'ml-3 md:flex')}>
					<Avatar className={cn('border')}>
						<AvatarImage className={cn('object-cover')} src={src} />
						<AvatarFallback>{`${user?.firstName ?? 'User'}`.substring(0, 2).toUpperCase()}</AvatarFallback>
					</Avatar>
					<div className={'text-left'}>
						<p className={'font-medium truncate max-w-36'}>
							{user?.firstName} {user?.lastName}
						</p>
						<p className={'text-xs'}>{user?.role}</p>
					</div>
				</div>
			</div>
		</header>
	);
};

const PhoneNav = ({ user, src }: { user?: UserModel; src: string }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger
				className={cn(
					buttonVariants({ size: 'icon', variant: 'outline' }),
					'rounded-full md:hidden',
					'rounded-full'
				)}
			>
				<MenuIcon className='h-[1.2rem] w-[1.2rem]' />
			</SheetTrigger>
			<SheetContent className='bg-card'>
				<SheetHeader>
					<SheetTitle>
						<div className={cn('flex gap-3 items-center mt-5')}>
							<Avatar>
								<AvatarImage className={cn('object-cover')} src={src} />
								<AvatarFallback>
									{`${user?.lastName ?? 'User'}`.substring(0, 2).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className={'text-left'}>
								<p className={'font-medium truncate'}>
									{user?.lastName} {user?.firstName}
								</p>
								<p className={'text-xs'}>{user?.role}</p>
							</div>
						</div>
					</SheetTitle>
				</SheetHeader>
				<DashboardSidebar onItemClick={() => setIsOpen(false)} />
			</SheetContent>
		</Sheet>
	);
};
