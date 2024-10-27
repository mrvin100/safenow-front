import { FileModel } from './file.model';
import { UserModel } from './user.model';

export type QuoteModel = {
	id: string;
	label: string;
	emitBy: UserModel;
	emitTo: UserModel;
	services: {
		label: string;
		description: string;
		price: number;
		qte: number;
	}[];
	totalAmount: number;
	quoteRequestId: QuoteRequestModel;
	isRead: boolean;
	createdAt?: Date;
	updatedAt?: Date;
};

export type QuoteRequestModel = {
	id: string;
	emitBy: UserModel;
	emitTo: UserModel;
	service: string;
	description: string;
	budget: number;
	isRead: boolean;
	files: FileModel[];
	createdAt?: Date;
	updatedAt?: Date;
};
