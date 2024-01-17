import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { createGroup, setCreateGroupFlag } from "../store/groupSlice";
import { CreateGroupReq } from "../common/types";
import CustomeDialog from "./Dialog";

const CreateGroup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { createGroupFlag } = useSelector((state: RootState) => state.group);
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
    <CustomeDialog
      title="Create Group"
      onClose={() => dispatch(setCreateGroupFlag())}
      open={createGroupFlag}
    >
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
    </CustomeDialog>
  );
};

export default CreateGroup;
