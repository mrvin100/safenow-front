export type PlaningModel = {
	id: string;
	userId: string;
	date: Date;
	ranges: RangeModel[];
};

export type RangeModel = {
	id?: string;
	start: string;
	end: string;
	key_id: string;
	isTaken: boolean;
};
