import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Activity } from "../common/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import NoDataFound from "./NoDataFound";
import CustomeDialog from "./Dialog";
import { setShowActivity } from "../store/groupSlice";

export default function TimeLine() {
  const { activity, showActivity } = useSelector(
    (state: RootState) => state.group
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <CustomeDialog
      title="Timeline"
      onClose={() => dispatch(setShowActivity(""))}
      open={showActivity}
    >
      {activity && activity.length > 0 ? (
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
                <TimelineContent>
                  Done by {item?.lastDoneBy.name}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      ) : (
        <NoDataFound />
      )}
    </CustomeDialog>
  );
}
