import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import { Done as DoneIcon, Clear as ClearIcon } from "@mui/icons-material";
import { CreateTaskReq, Group } from "../common/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { addTask, setShowAddTask } from "../store/groupSlice";

interface AddTaskProps {
  group: Group;
}
export default function AddTask(props: AddTaskProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { group } = props;

  const [task, setTask] = useState("");
  const [toBeAssignedTo, setToBeAssignedTo] = useState<string>("");
  const [error, setError] = useState(false);

  const { isSuccess } = useSelector((state: RootState) => state.group);

  const handleAssignedToChange = (e: SelectChangeEvent) => {
    setToBeAssignedTo(e.target.value as string);
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleClearBtn = () => {
    setTask("");
    setToBeAssignedTo("");
    setError(false);
    dispatch(setShowAddTask());
  };

  const handleDispatchAddTask = () => {
    if (task.trim().length === 0 && toBeAssignedTo.length === 0) {
      setError(true);
    } else {
      setError(false);
      const taskReq = {
        taskName: task.trim(),
        groupId: group?._id,
        toBeDoneBy: toBeAssignedTo,
      } as CreateTaskReq;
      dispatch(addTask(taskReq)).then((data) => {
        if (isSuccess) {
          setTask("");
          setToBeAssignedTo("");
        }
      });
    }
  };
  return (
    <>
      <Grid item xs={9} sm={9} md={9} lg={9}>
        <TextField
          label="Task"
          variant="outlined"
          value={task}
          onChange={handleTaskChange}
          fullWidth
          error={error}
          helperText={error && <span>Please enter Task</span>}
          required
        />
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2}>
        <FormControl fullWidth required>
          <InputLabel>Assigned To</InputLabel>
          <Select
            label="Assigned To"
            onChange={handleAssignedToChange}
            value={toBeAssignedTo}
          >
            {group.members?.map((member) => (
              <MenuItem key={member._id} value={member._id}>
                {member.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1}>
        <IconButton color="success" onClick={handleDispatchAddTask}>
          <DoneIcon />
        </IconButton>
        <IconButton color="error" onClick={handleClearBtn}>
          <ClearIcon />
        </IconButton>
      </Grid>
    </>
  );
}
