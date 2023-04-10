import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import TrainIcon from "@mui/icons-material/Train";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { JourneyType, Section, Station, routes } from "../data";
import { Colors } from "../utils";

export type StationCardProps = Station & {
  isFirst?: boolean;
  isEnd?: boolean;
  isTransfer?: boolean;
  duration: number;
  total: number;
};

const findTotalDuration = (
  stationId: number,
  index: number,
  self: number[]
): number => {
  if (index !== self.length - 1) {
    const next = self[index + 1];
    const nonReverse = routes.find(
      (record) => record.id_from === stationId && record.id_to === next
    );
    const reverse = routes.find(
      (record) => record.id_from === next && record.id_to === stationId
    );
    if (nonReverse?.delay) {
      return nonReverse.delay;
    } else if (reverse?.delay) {
      return reverse.delay;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

const StationCard: React.FunctionComponent<StationCardProps> = React.memo(
  ({
    name,
    line,
    isEnd = false,
    isTransfer = false,
    isFirst = false,
    duration,
    total,
  }) => {
    const colorClass = Colors[line];
    let icon: JSX.Element;
    let connector: JSX.Element | null = null;
    let description: JSX.Element | null = null;
    let lineAbbr: JSX.Element | null = null;
    // COMMENT: which icon to show only drive type or transfer type
    if (isTransfer) {
      icon = <DirectionsWalkIcon />;
    } else {
      icon = <TrainIcon />;
    }
    // COMMENT: First or Transfer will show LINE name
    if (isTransfer || isFirst) {
      lineAbbr = (
        <Typography variant="subtitle2" className="font-semi-bold">
          {line}
        </Typography>
      );
    }
    // COMMENT: check to show line connector or not basically will be not shown when end station of each step
    if (!isEnd) {
      connector = (
        <TimelineConnector className={isTransfer ? "" : colorClass} />
      );
    }
    // COMMENT: check the first station of step need to show How many stops for them but this logic is (-1) not counting start and end
    // COMMENT: Transfer will show as Transfer (x) minutes
    if (isFirst && isTransfer) {
      description = (
        <Typography variant="subtitle1" className={"font-bold text-gray-600"}>
          Transfer {duration / 60} minutes
        </Typography>
      );
    } else if (isFirst) {
      description = (
        <Typography variant="subtitle1" className={"font-bold text-gray-600"}>
          {total} station(s) {duration / 60} minutes
        </Typography>
      );
    } else {
      description = null;
    }

    return (
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className={colorClass}>{icon}</TimelineDot>
          {connector}
        </TimelineSeparator>
        <TimelineContent>
          <Paper className="station-card" elevation={0}>
            <Typography variant="body1" className="font-bold mt-3">
              {name.en}
            </Typography>
            <Typography variant="body1" className="">
              {name.th}
            </Typography>
            {lineAbbr}
            {description}
          </Paper>
        </TimelineContent>
      </TimelineItem>
    );
  }
);

const JourneyTimeline: React.FunctionComponent<Section> = ({ journey }) => {
  // calculate total duration per journey
  return (
    <React.Fragment>
      {journey.map((step, stepIdx, journeyArr) => {
        const duration = step.stations
          .map((record) => record.id)
          .map(findTotalDuration)
          .reduce((accumulator, current) => (accumulator += current), 0);
        return (
          <React.Fragment key={stepIdx}>
            {step.stations.map((station, stationIdx, stationsArr) => (
              <StationCard
                key={`${stepIdx}-${stationIdx}`}
                {...station}
                isFirst={stationIdx === 0}
                isEnd={stationIdx === stationsArr.length - 1}
                isTransfer={step.type === JourneyType.TRANSFER}
                duration={duration}
                total={stationsArr.length - 1}
              />
            ))}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default React.memo(JourneyTimeline);