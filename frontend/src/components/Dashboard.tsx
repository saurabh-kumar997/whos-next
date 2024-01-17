import CustomAccordion from "./Accordion";
import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import GroupDetail from "./GroupDetail";
import CreateGroup from "./CreateGroup";
import { Group } from "../common/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchAllGroups, setCreateGroupFlag } from "../store/groupSlice";
import Loader from "./Loader";
import CustomSnackbars from "./SnackBar";
import TimeLine from "./TimeLine";
import NoDataFound from "./NoDataFound";
import LogOutDialog from "./LogOutDialog";

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllGroups());
  }, []);

  const { groups } = useSelector((state: RootState) => state.group);

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
      <GroupDetail />
      <CreateGroup />
      <TimeLine />
      <LogOutDialog />
    </>
  );
}

export default Dashboard;
