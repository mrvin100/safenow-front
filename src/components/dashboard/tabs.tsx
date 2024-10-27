'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TabType } from '@src/helpers/util-types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

export type TabsProps = {
	baseUrl: string;
	content: TabType[];
};

export const Tabs: FC<TabsProps> = ({ content, baseUrl }) => {
	const path = usePathname();

	const isCurrentRoute = (route: string) => {
		if (route === path && path === baseUrl) return true;

		if (route === baseUrl) return false;

		return path.includes(route);
	};

	return (
		<div className={cn('flex gap-2 mb-5', 'bg-card border rounded-xl p-1')}>
			{content.map((tab, index) => (
				<Link href={tab.link} key={index}>
					<Button
						variant={'ghost'}
						className={cn('font-medium', {
							'bg-primary/10 text-primary': isCurrentRoute(tab.link),
							'hover:bg-primary/15 hover:text-primary': isCurrentRoute(tab.link),
						})}
					>
						{tab.icon}
						<span className='ml-2'>{tab.label}</span>
					</Button>
				</Link>
			))}
		</div>
	);
};
