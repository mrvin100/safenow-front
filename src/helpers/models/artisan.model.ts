import { ProfessionModel } from './profession.model';
import { UserModel } from './user.model';

export type ArtisanModel = {
	id: string;
	profession: ProfessionModel;
	city: string;
	location: { lat: number; lng: string };
	biography: string;
	userId: UserModel;
};
