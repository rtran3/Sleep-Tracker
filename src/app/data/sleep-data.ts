import { nanoid } from 'nanoid';

export class SleepData {
	id:string;

	constructor() {
		//Assign a random (unique) ID. This may be useful for comparison (e.g., are two logged entries the same).
		this.id = nanoid();
	}

	summaryString():string {
		return 'Unknown sleep data';
	}
}
