/* from the Stanford Sleepiness Scale */
/* https://web.stanford.edu/~dement/sss.html */

import { SleepData } from './sleep-data';

export class StanfordSleepinessData extends SleepData {
	public static ScaleValues = [undefined,//Sleepiness scale starts at 1
	'Feeling active, vital, alert, or wide awake', //1
	'Functioning at high levels, but not at peak; able to concentrate', //2
	'Awake, but relaxed; responsive but not fully alert', //3
	'Somewhat foggy, let down', //4
	'Foggy; losing interest in remaining awake; slowed down', //5
	'Sleepy, woozy, fighting sleep; prefer to lie down', //6
	'No longer fighting sleep, sleep onset soon; having dream-like thoughts']; //7

	private loggedValue:number;
	private loggedAt:Date;

	constructor(loggedValue:number, loggedAt:Date) {
		super();
		this.loggedValue = loggedValue;
		this.loggedAt = loggedAt;
	}

	summaryString():string {
		return this.loggedValue + ": " + StanfordSleepinessData.ScaleValues[this.loggedValue];
	}

	dateString():string {
		return this.loggedAt.toLocaleDateString('en-US', { weekday: 'long', year:'numeric', month: 'long', day: 'numeric' });
	}

	timeString():string {
		return this.loggedAt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
	}

	toObject():{} {
		return {"loggedValue":this.loggedValue, "loggedAt":this.loggedAt};
	}
}
