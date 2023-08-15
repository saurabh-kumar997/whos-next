import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

export default function TimeLine(props: any) {
  const { activity } = props;
  return activity.length > 0 ? (
    <Timeline position="right">
      {activity.map((item: any) => {
        return (
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              {item?.doneOnDate}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Done by {item?.lastDoneBy}</TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  ) : (
    <></>
  );
}
