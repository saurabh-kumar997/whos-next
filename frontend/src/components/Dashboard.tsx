import data from "../data.json";
import CustomAccordion from "./Accordion";
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CustomeDialog from "./Dialog";
import GroupDetail from "./GroupDetail";
import { Group } from "../common/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchAllGroups, setGroupDetailFlag } from "../store/groupSlice";

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllGroups());
  }, []);

  const { groups, group, groupDetailFlag } = useSelector(
    (state: RootState) => state.group
  );

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Button variant="contained">Create Group</Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {groups?.map((group: Group) => {
            return <CustomAccordion group={group} key={group._id} />;
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
    </>
  );
}

export default Dashboard;
