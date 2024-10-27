import { UserModel } from './user.model';

export enum InvitationStatus {
	PENDING = 'pending',
	REFUSED = 'canceled',
	ACCEPTED = 'completed',
}

export type InvitationModel = {
	id: string;
	emitBy: UserModel;
	emitTo: UserModel;
	status: InvitationStatus;
	createdAt?: Date;
	updatedAt?: Date;
};
