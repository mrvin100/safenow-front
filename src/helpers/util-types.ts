import { ReactNode } from 'react';
import { UserModel } from './models/user.model';

export type OptionItem<T> = {
	label: string;
	value: T;
};

export type FAQType = {
	id: string;
	question: string;
	response: string;
};

export type Auth = {
	user?: UserModel;
	token?: string;
};

export type TabType = {
	link: string;
	label: string;
	icon?: ReactNode;
};

export type ResponseCollectionType<T> = {
	page: number;
	limit: number;
	totalItems: number;
	totalPages: number;
	content: T;
};
