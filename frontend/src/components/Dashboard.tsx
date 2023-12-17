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
} from "../store/groupSlice";

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllGroups());
  }, []);

  const { groups, group, groupDetailFlag, createGroupFlag } = useSelector(
    (state: RootState) => state.group
  );

  return (
    <>
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
          {groups?.map((group: Group) => {
            return <CustomAccordion group={group} key={group?._id} />;
          })}
        </Grid>
      </Grid>
      <CustomeDialog
        title="Group Details"
        onClose={() => dispatch(setGroupDetailFlag())}
        open={groupDetailFlag}
      >
        <GroupDetail group={group} />
      </CustomeDialog>
      <CustomeDialog
        title="Create Group"
        onClose={() => dispatch(setCreateGroupFlag())}
        open={createGroupFlag}
      >
        <CreateGroup />
      </CustomeDialog>
    </>
  );
}

export default Dashboard;
