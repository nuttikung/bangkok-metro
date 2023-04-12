import { Journey } from "./journey";
import { Route } from "./route";

export type Section = {
  journey: Journey[];
  edges: Route[];
  stations: number[];
  duration: number;
};

export type SectionLinegroup = Section & {
  lineGroup: string;
};

export type SectionLine = Section & {
  lines: number[];
};
