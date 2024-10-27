export type ReviewModel = {
	id: string;
	belongsTo: string;
	emitBy: string;
	projectId: string;
	message: string;
	rating: number;
};
