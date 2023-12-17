import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { createGroup, setCreateGroupFlag } from "../store/groupSlice";
import { CreateGroupReq } from "../common/types";

const CreateGroup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [groupName, setGroupName] = useState("");
  const [error, setFieldError] = useState(false);

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFieldError(false);
    setGroupName(event.target.value);
  };

  const handleSaveClick = () => {
    if (groupName.trim().length > 0) {
      dispatch(createGroup({ groupName } as CreateGroupReq));
    } else {
      // Add Error alert
      setFieldError(true);
    }
  };

  const handleCancelClick = () => {
    setGroupName("");
    dispatch(setCreateGroupFlag());
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={8} sm={8} md={8} lg={8}>
        <TextField
          label="Group Name"
          variant="outlined"
          value={groupName}
          onChange={handleGroupNameChange}
          fullWidth
          error={error}
          helperText={error && <span>Please enter valid Group Name</span>}
        />
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
              fullWidth
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancelClick}
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateGroup;
