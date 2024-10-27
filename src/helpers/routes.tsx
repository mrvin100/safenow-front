import { AcademicCapIcon } from '@heroicons/react/24/solid';
import {
	CalendarClock,
	ClipboardList,
	Hammer,
	LayoutDashboard,
	ListChecks,
	UserCheck,
	UserIcon,
	Users,
	UsersIcon,
} from 'lucide-react';

export const ADMIN_ROUTES = [
	{
		label: 'Tableau de bord',
		link: '/dashboard',
		icon: <LayoutDashboard className={'size-6'} />,
	},
	{
		label: 'Metiers',
		link: '/dashboard/professions',
		icon: <AcademicCapIcon className={'size-6'} />,
	},
	{
		label: 'Verification comptes',
		link: '/dashboard/verify-accounts',
		icon: <UserCheck className={'size-6'} />,
	},
	{
		label: 'Comptes artisans',
		link: '/dashboard/artisan-accounts',
		icon: <UsersIcon className={'size-6'} />,
	},
	{
		label: 'Comptes clients',
		link: '/dashboard/client-accounts',
		icon: <UsersIcon className={'size-6'} />,
	},
	{
		label: 'Mon profil',
		link: '/dashboard/profile',
		icon: <UserIcon className={'size-6'} />,
	},
];

export const ARTISAN_ROUTES = [
	{
		label: 'Tableau de bord',
		link: '/dashboard',
		icon: <LayoutDashboard className={'size-6'} />,
	},
	{
		label: 'Projets',
		link: '/dashboard/projects',
		icon: <ListChecks className={'size-6'} />,
	},
	{
		label: 'Planing',
		link: '/dashboard/planing',
		icon: <CalendarClock className={'size-6'} />,
	},
	{
		label: 'Gestion de devis',
		link: '/dashboard/manage-quotes',
		icon: <ClipboardList className={'size-6'} />,
	},
	{
		label: 'Mes services',
		link: '/dashboard/services',
		icon: <Hammer className={'size-6'} />,
	},
	{
		label: 'Collaborations',
		link: '/dashboard/collaborations',
		icon: <Users className={'size-6'} />,
	},
	{
		label: 'Mon profil',
		link: '/dashboard/profile',
		icon: <UserIcon className={'size-6'} />,
	},
];

export const USER_ROUTES = [
	{
		label: 'Tableau de bord',
		link: '/dashboard',
		icon: <LayoutDashboard className={'size-6'} />,
	},
	{
		label: 'Rendez-vous',
		link: '/dashboard/appointments',
		icon: <CalendarClock className={'size-6'} />,
	},
	{
		label: 'Devis',
		link: '/dashboard/quotes',
		icon: <ClipboardList className={'size-6'} />,
	},
	{
		label: 'Mon profil',
		link: '/dashboard/profile',
		icon: <UserIcon className={'size-6'} />,
	},
];
