import * as React from "react";
import TimeLine from "./TimeLine";
import CustomeDialog from "./Dialog";

export default function CustomActivity(props: any) {
  const { activityFlag, handleActivityClose, activity } = props;

  return (
    <>
      <CustomeDialog
        title="Activity"
        onClose={handleActivityClose}
        open={activityFlag}
      >
        <TimeLine activity={activity} />
      </CustomeDialog>
    </>
  );
}
