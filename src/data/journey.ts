import { Station } from "./station";

export enum JourneyType {
  DRIVE,
  TRANSFER,
}

export type Journey = {
  type: JourneyType;
  stations: Station[];
};
