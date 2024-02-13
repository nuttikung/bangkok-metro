import { Station } from "./station";

export enum JourneyType {
	DRIVE = 0,
	TRANSFER = 1,
}

export type Journey = {
	type: JourneyType;
	stations: Station[];
};
