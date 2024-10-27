export enum ProjectStatus {
	PENDING = 'PENDING',
	IN_COURSE = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
	CANCELED = 'CANCELED',
}

export type ProjectModel = {
	id: string;
	label: string;
	belongsTo: string;
	buildBy: string;
	quoteId: string;
	status: ProjectStatus;
};
