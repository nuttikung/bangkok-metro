import { Journey } from "./journey";

export type Section = {
  journey: Journey[];
  duration: number;
};

export type SectionLinegroup = Section & {
  lineGroup: string;
};

export type SectionLine = Section & {
  lines: number[];
};
