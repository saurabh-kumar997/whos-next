import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import CustomTable from "./Table";
import { AddMembersReq, Group } from "../common/types";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import {
  addMember,
  removeMember,
  setGroupDetailFlag,
  updateGroup,
} from "../store/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Response } from "../common/types";
import CustomeDialog from "./Dialog";

const columns = ["Members", "Action"];

export default function GroupDetail() {
  const dispatch = useDispatch<AppDispatch>();

  const { group, groupDetailFlag } = useSelector(
    (state: RootState) => state.group
  );
  const { user } = useSelector((state: RootState) => state.userAuth);

  // const { group } = props;
  const [groupName, setGroupName] = useState("");
  const [email, setEmail] = useState("");
  const [disabledEdit, setDisabledEdit] = useState(true);

  useEffect(() => {
    if (group) {
      setGroupName(group.groupName);
    }
  }, []);

  const handleEditFlag = () => {
    setDisabledEdit((state) => !state);
  };

  const handleCancelBtn = () => {
    if (group) {
      setGroupName(group.groupName);
    }
    handleEditFlag();
  };
  const handleGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleAddMember = () => {
    dispatch(addMember({ email, groupId: group?._id } as AddMembersReq)).then(
      (data) => {
        const res = data.payload as Response<Group>;
        if (res.status === 200) {
          setEmail("");
        }
      }
    );
  };

  return (
    <CustomeDialog
      title="Group Details"
      onClose={() => dispatch(setGroupDetailFlag())}
      open={groupDetailFlag}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8} sm={8} md={8} lg={8}>
              <TextField
                label="Group Name"
                fullWidth
                value={groupName}
                disabled={disabledEdit}
                onChange={handleGroupName}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              {disabledEdit && (
                <Tooltip title="Edit Group Name">
                  <IconButton
                    size="large"
                    color="primary"
                    onClick={handleEditFlag}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              {!disabledEdit && (
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() =>
                        dispatch(
                          updateGroup({ groupId: group?._id, groupName })
                        )
                      }
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Button
                      fullWidth
                      color="error"
                      variant="contained"
                      onClick={handleCancelBtn}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        {user?._id === group?.admin && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8} sm={8} md={8} lg={8}>
                <TextField
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Button fullWidth variant="contained" onClick={handleAddMember}>
                  Add Member
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CustomTable columns={columns}>
                <MembersTableRows />
              </CustomTable>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CustomeDialog>
  );
}

function MembersTableRows() {
  const dispatch = useDispatch<AppDispatch>();
  const { group } = useSelector((state: RootState) => state.group);
  const { user } = useSelector((state: RootState) => state.userAuth);

  const members = group?.members || [];

  return members && members.length > 0 ? (
    members.map((member) => (
      <TableRow
        key={member._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell scope="row" align="center">
          {member.name}
        </TableCell>
        <TableCell scope="row" align="center">
          <Stack direction="row" spacing={2} justifyContent="center">
            {user?._id === group?.admin && (
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={() =>
                    dispatch(
                      removeMember({
                        email: member.email,
                        groupId: group?._id,
                      } as AddMembersReq)
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <></>
  );
}
