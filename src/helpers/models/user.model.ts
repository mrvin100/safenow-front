export enum Role {
	ADMIN = 'Admin',
	ARTISAN = 'Artisan',
	CLIENT = 'Client',
}

export type UserModel = {
	id: string;
	lastName: string;
	firstName: string;
	email: string;
	phone: string;
	address: string;
	role: Role;
	token: string;
	profileImage?: string;
};
