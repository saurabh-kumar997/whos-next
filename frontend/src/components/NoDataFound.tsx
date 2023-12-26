import { Grid } from "@mui/material";
import NoData from "../assets/no_data.svg";

function NoDataFound() {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <img
          src={NoData}
          alt="No Data Found"
          title="No Data Found"
          style={{ height: 200, width: 200 }}
        />
      </Grid>
    </Grid>
  );
}

export default NoDataFound;
