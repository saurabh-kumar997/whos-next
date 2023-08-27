import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { Activity, Group } from "../common/types";
import CustomActivity from "./Activity";
import CustomTable from "./Table";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface CustomTaskProps {
  group: Group;
  columns: Array<string>;
}

interface CustomContentProps {
  group: Group;
  handleActivity: (taskId: string) => void;
  activityFlag: boolean;
}

function Task(props: CustomTaskProps) {
  const { columns, group } = props;
  const [activity, setActivity] = useState(new Array<Activity>());
  const [activityFlag, setActivityFlag] = useState(false);

  const handleActivity = (taskId: string) => {
    console.log("Clicked");
    const task = group.tasks.filter((task) => task._id === taskId);
    const activity =
      task.length > 0 && task[0].activity ? task[0].activity : [];
    setActivity(activity);
    setActivityFlag(true);
  };

  const handleActivityClose = () => {
    setActivityFlag(false);
  };
  return (
    <>
      <CustomTable columns={columns}>
        <CustomContent
          group={group}
          handleActivity={handleActivity}
          activityFlag={activityFlag}
        />
      </CustomTable>
      <CustomActivity
        activityFlag={activityFlag}
        activity={activity}
        handleActivityClose={handleActivityClose}
      />
    </>
  );
}

function CustomContent(props: CustomContentProps) {
  const { group, handleActivity } = props;
  return group.tasks.map((task) => {
    let lastDoneBy =
      task?.activity?.length > 0
        ? task.activity[task.activity.length - 1]?.lastDoneBy
        : null;
    return (
      <TableRow
        key={task._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell scope="row" align="center">
          {task.taskName}
        </TableCell>
        <TableCell scope="row" align="center">
          {task.toBeDoneBy}
        </TableCell>
        <TableCell scope="row" align="center">
          {lastDoneBy}
        </TableCell>
        <TableCell scope="row" align="center">
          <Stack direction="row" spacing={2} justifyContent="center">
            <Tooltip title="Mark As Done">
              <IconButton>
                <DoneAllIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="See Past Activity">
              <IconButton onClick={() => handleActivity(task._id)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Task">
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
    );
  });
}

export default Task;
