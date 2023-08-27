import data from "../data.json";
import CustomAccordion from "./Accordion";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import CustomeDialog from "./Dialog";
import GroupDetail from "./GroupDetail";
import { Group } from "../common/types";

function Dashboard() {
  const [group, setGroup] = useState<Group | null>(null);
  const [groupDetailFlag, setGroupDetailFlag] = useState<boolean>(false);

  const handleViewGroupOpen = (groupId: string) => {
    const groupData = data.groups.filter((group) => group._id === groupId);
    if (groupData.length > 0) setGroup(groupData[0]);
    setGroupDetailFlag(true);
  };
  const handleViewGroupClose = () => {
    setGroupDetailFlag(false);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Button variant="contained">Create Group</Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {data.groups.map((group) => {
            return (
              <CustomAccordion
                group={group}
                key={group._id}
                handleViewGroupOpen={handleViewGroupOpen}
                handleViewGroupClose={handleViewGroupClose}
                groupDetailFlag={groupDetailFlag}
              />
            );
          })}
        </Grid>
      </Grid>
      <CustomeDialog
        title="Group Details"
        onClose={handleViewGroupClose}
        open={groupDetailFlag}
      >
        <GroupDetail group={group} />
      </CustomeDialog>
    </>
  );
}

export default Dashboard;
