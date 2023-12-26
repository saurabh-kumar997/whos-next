import CustomAccordion from "./Accordion";
import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import CustomeDialog from "./Dialog";
import GroupDetail from "./GroupDetail";
import CreateGroup from "./CreateGroup";
import { Group } from "../common/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  fetchAllGroups,
  setGroupDetailFlag,
  setCreateGroupFlag,
  setShowActivity,
} from "../store/groupSlice";
import Loader from "./Loader";
import CustomSnackbars from "./SnackBar";
import TimeLine from "./TimeLine";
import NoDataFound from "./NoDataFound";

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllGroups());
  }, []);

  const { groups, groupDetailFlag, createGroupFlag, showActivity } =
    useSelector((state: RootState) => state.group);

  return (
    <>
      <Loader />
      <CustomSnackbars />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Button
            variant="contained"
            onClick={() => dispatch(setCreateGroupFlag())}
          >
            Create Group
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {groups && groups.length > 0 ? (
            groups?.map((group: Group) => {
              return <CustomAccordion group={group} key={group?._id} />;
            })
          ) : (
            <NoDataFound />
          )}
        </Grid>
      </Grid>
      <CustomeDialog
        title="Group Details"
        onClose={() => dispatch(setGroupDetailFlag())}
        open={groupDetailFlag}
      >
        <GroupDetail />
      </CustomeDialog>
      <CustomeDialog
        title="Create Group"
        onClose={() => dispatch(setCreateGroupFlag())}
        open={createGroupFlag}
      >
        <CreateGroup />
      </CustomeDialog>
      <CustomeDialog
        title="Timeline"
        onClose={() => dispatch(setShowActivity(""))}
        open={showActivity}
      >
        <TimeLine />
      </CustomeDialog>
    </>
  );
}

export default Dashboard;
