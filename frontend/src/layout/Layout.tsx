import { useState } from "react";
import { AppBar, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Avatar from "../components/Avatar";
import CustomeDialog from "../components/Dialog";
import MemberDetail from "../components/MyAccount";

export default function MainLayout() {
  const [memberDataFlag, setMemberDataFlag] = useState<boolean>(false);
  const handleViewMemberData = () => {
    setMemberDataFlag((state) => !state);
  };
  return (
    <Box sx={{ display: "flex", margin: "5em" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h6" noWrap component="h6">
                Who's Next?
              </Typography>
            </Grid>
            <Grid item>
              <Avatar handleViewMemberData={handleViewMemberData} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Outlet />
        </Grid>
      </Grid>
      <CustomeDialog
        title="Acount Info"
        onClose={handleViewMemberData}
        open={memberDataFlag}
      >
        <MemberDetail />
      </CustomeDialog>
    </Box>
  );
}
