import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;
	private sleep_ms:number;
	private loggedAt:Date;


	constructor(sleepStart:Date, sleepEnd:Date, loggedAt:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
		this.loggedAt = loggedAt;
	}

	summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes";
	}

	dateString():string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', year:'numeric', month: 'long', day: 'numeric' });
	}

	timeString():string {
		return this.loggedAt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
	}
	sleepMs():number {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		this.sleep_ms=difference_ms;
		return this.sleep_ms;
	}
	dateValue():Date{
		return this.sleepStart;
	}

	toObject():{} {
		return {'sleepStart':this.sleepStart, 'sleepEnd':this.sleepEnd, 'loggedAt':this.loggedAt};
	}
}
