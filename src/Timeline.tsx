import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import React from "react";
import { Journey, JourneyType } from "./App";
import { Colors } from "./utils";

const MyTimeline: React.FunctionComponent<Journey> = ({ type, stations }) => {
  if (type === JourneyType.DRIVE) {
    // console.log("drive got");
    return (
      <Timeline>
        {stations.map((station, index, selfArray) => {
          const colorClass = Colors[station.line];
          if (index === selfArray.length - 1) {
            return (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className={colorClass} color="inherit" />
                </TimelineSeparator>
                <TimelineContent>{station.name.th}</TimelineContent>
              </TimelineItem>
            );
          }
          return (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot className={colorClass} color="inherit" />
                <TimelineConnector className={colorClass} />
              </TimelineSeparator>
              <TimelineContent>{station.name.th}</TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    );
  }

  console.log(stations[1]);
  return null;
  // return (
  //   <TimelineItem>
  //     <TimelineSeparator>
  //       <TimelineDot className={colorClass} color="inherit" />
  //     </TimelineSeparator>
  //     <TimelineContent>{station.name.th}</TimelineContent>
  //   </TimelineItem>
  // );
};

export default React.memo(MyTimeline);
