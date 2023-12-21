import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Activity } from "../common/types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function TimeLine() {
  const { activity } = useSelector((state: RootState) => state.group);

  return activity && activity.length > 0 ? (
    <Timeline position="right">
      {activity?.map((item: Activity) => {
        return (
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              {item?.doneOnDate}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Done by {item?.lastDoneBy.name}</TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  ) : (
    <></>
  );
}
