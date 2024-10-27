import { PlaningModel } from './planing.model';
import { QuoteModel } from './quote.model';
import { UserModel } from './user.model';

export enum AppointmentStatus {
	PENDING = 'PENDING',
	REFUSED = 'CANCELED',
	ACCEPTED = 'COMPLETED',
}

export type AppointmentModel = {
	id: string;
	emitBy: UserModel;
	emitTo: UserModel;
	quoteId: QuoteModel;
	status: AppointmentStatus;
	planingId: PlaningModel;
	createdAt?: Date;
	updatedAt?: Date;
};
