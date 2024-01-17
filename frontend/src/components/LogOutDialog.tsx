import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { logOut } from "../store/authStore";
import CustomeDialog from "./Dialog";

export default function LogOutDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const logOutFlag = useSelector((state: RootState) => state.group).logOut;
  return (
    <CustomeDialog
      title="Session Expired"
      showCloseIcon={false}
      open={logOutFlag}
    >
      <Grid container alignItems="center" direction="column" spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="body1">
            Your Session has expired, please logout and login again.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Button
            onClick={() => dispatch(logOut())}
            variant="outlined"
            color="error"
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </CustomeDialog>
  );
}
