import { Journey, JourneyType, Station, subwayLines as lines } from "../data";
import { routes } from "../data/route";
import { Section, SectionLine, SectionLinegroup } from "../data/section";
import { stations } from "../data/station";

export const whichLine = (station: number) => {
  let result: number = -1;
  for (let i = 0; i < lines.length; i++) {
    const element = lines[i];
    if (element.stations.indexOf(station) !== -1) {
      result = element.id;
      break;
    }
  }
  return result;
};

export const useLess = (routeGroup: number[]) => {
  const lines: number[] = [];
  let isUseless: boolean = false;
  const stack: number[] = [];
  let current: number | undefined;
  routeGroup.forEach((route) => {
    lines.push(whichLine(route));
  });
  for (let i = 0; i < lines.length; i++) {
    // Different line
    if (stack.length === 0) {
      stack.push(lines[i]);
      current = lines[i];
    } else if (current !== lines[i]) {
      // change subway line
      if (stack.indexOf(lines[i]) === -1) {
        stack.push(lines[i]);
        current = lines[i];
      } else {
        isUseless = true;
        break;
      }
    }
  }
  return !isUseless;
};

export const getStationGroup = (routeGroup: number[] = []): Section => {
  const pathStations: Station[] = [];
  let duration: number = 0;
  routeGroup.forEach((element, index, self) => {
    const stationGroup = stations.find((record) => record.id === element);
    if (stationGroup !== undefined) {
      pathStations.push(stationGroup);
    }
    // find duration
    if (index !== self.length - 1) {
      let non_reverse = routes.find(
        (record) =>
          record.id_from === element && record.id_to === routeGroup[index + 1]
      );
      let reverse = routes.find(
        (record) =>
          record.id_from === routeGroup[index + 1] && record.id_to === element
      );
      if (non_reverse !== undefined) {
        duration += non_reverse.delay;
      }
      if (reverse !== undefined) {
        duration += reverse.delay;
      }
    }
  });

  return {
    journey: getJourney(pathStations),
    duration: duration,
  };
};

export const getJourney = (route: Station[] = []): Journey[] => {
  let journey: Journey[] = [];
  let stack: Station[] = [];
  let currentLine: string = "";
  for (let i = 0; i < route.length; i++) {
    if (currentLine === "") {
      currentLine = route[i].line;
      stack.push(route[i]);
    } else if (i === route.length - 1) {
      if (currentLine === route[i].line) {
        stack.push(route[i]);
        journey.push({ type: JourneyType.DRIVE, stations: stack });
      } else if (stack.length > 1) {
        journey.push({ type: JourneyType.DRIVE, stations: stack });
        journey.push({
          type: JourneyType.TRANSFER,
          stations: [route[i - 1], route[i]],
        });
      }
    } else {
      if (currentLine !== route[i].line) {
        // change line detect
        if (stack.length > 1) {
          journey.push({ type: JourneyType.DRIVE, stations: stack });
          journey.push({
            type: JourneyType.TRANSFER,
            stations: [route[i - 1], route[i]],
          });
          currentLine = route[i].line;

          stack = [route[i]];
        } else {
          // stack length === 1
          journey.push({
            type: JourneyType.TRANSFER,
            stations: [route[i - 1], route[i]],
          });
          currentLine = route[i].line;

          stack = [route[i]];
        }
      } else {
        stack.push(route[i]);
      }
    }
  }
  return journey;
};

export const getLineGroup = (
  source: Section,
  index: number
): SectionLinegroup => {
  const lineGrop = source.journey
    .map((record) => record.stations.map((rc) => rc.line))
    .reduce((prev, next) => prev.concat(next))
    .reduce(
      (unique: string[], item: string) =>
        unique.includes(item) ? unique : [...unique, item],
      []
    )
    .join("-");
  return {
    ...source,
    lineGroup: lineGrop,
  };
};

export const excludeSameLine = (
  source: SectionLinegroup,
  index: number,
  self: SectionLinegroup[]
) => {
  const idxFound = self.findIndex(
    (record) => record.lineGroup === source.lineGroup
  );
  if (idxFound === -1 || idxFound === index) {
    return true;
  }
  return false;
};

export const transformToSectionLine = (
  source: SectionLinegroup
): SectionLine => {
  const { lineGroup, ...rest } = source;
  const scopeLines: number[] = lineGroup
    .split("-")
    .map((record) => lines.find((line) => line.name === record)?.id || -999)
    .filter((record) => record !== -999);
  return {
    ...rest,
    lines: scopeLines,
  };
};

export const notAllowMultipleTransfer = (source: SectionLine) => {
  const { journey } = source;
  const isMultipleTransfer = journey
    .map(
      (record, index, self) =>
        (record.type === JourneyType.TRANSFER &&
          JourneyType.TRANSFER === self[index + 1]?.type) ||
        false
    )
    .some((element) => element === true);
  return !isMultipleTransfer;
};

export const inDurationRangeTen = (
  source: SectionLine,
  index: number,
  self: SectionLine[]
) => {
  if (self.length <= 1) {
    return true;
  }
  // first element is key for duration
  const acceptanceDuration = self[0].duration + 600;
  return acceptanceDuration - source.duration > 0;
};
