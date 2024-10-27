export enum TaskStatus {
	PENDING = 'pending',
	IN_COURSE = 'in_course',
	COMPLETED = 'completed',
	CANCELED = 'canceled',
}

export type TaskModel = {
	id: string;
	projectId: string;
	body: string;
	description: string;
	status: TaskStatus;
	asignTo: string;
	tags: string[];
};
