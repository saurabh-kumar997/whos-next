import { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

export default function MemberDetail() {
  const [state, setState] = useState({
    name: "",
    email: "",
  });
  const [disabledEdit, setDisabledEdit] = useState(true);

  useEffect(() => {}, []);

  const handleEditFlag = () => {
    setDisabledEdit((state) => !state);
  };
  const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Grid container spacing={4} direction="column" alignItems="stretch">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container justifyContent="flex-end" direction="row" spacing={2}>
          <Grid item>
            {disabledEdit && (
              <Button onClick={handleEditFlag} variant="contained">
                Edit
              </Button>
            )}
          </Grid>
          {!disabledEdit && (
            <>
              <Grid item>
                <Button variant="contained">Save</Button>
              </Grid>
              <Grid item>
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleEditFlag}
                >
                  Cancel
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={2} direction="row" alignItems="stretch">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Name"
              fullWidth
              value={state.name}
              onChange={handleState}
              disabled={disabledEdit}
              name="name"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Email"
              fullWidth
              value={state.email}
              onChange={handleState}
              disabled={disabledEdit}
              name="email"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography component="h1" color="error">
              Danger Area: Account Deletion
            </Typography>
          </Grid>
          <Grid item>
            <Button color="error" variant="outlined">
              Delete My Account
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

{
  /*  */
}
