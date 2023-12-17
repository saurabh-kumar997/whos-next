import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { Activity, DeleteTaskReq, Group } from "../common/types";
import CustomActivity from "./Activity";
import CustomTable from "./Table";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { markTaskAsDone, removeTask } from "../store/groupSlice";

interface CustomTaskProps {
  columns: Array<string>;
}

interface CustomContentProps {
  handleActivity: (taskId: string) => void;
  activityFlag: boolean;
}

function Task(props: CustomTaskProps) {
  const { columns } = props;
  const [activity, setActivity] = useState(new Array<Activity>());
  const [activityFlag, setActivityFlag] = useState(false);

  const handleActivity = (taskId: string) => {
    // console.log("Clicked");
    // const task = group?.tasks.filter((task) => task._id === taskId);
    // const activity =
    //   task.length > 0 && task[0].activity ? task[0].activity : [];
    // setActivity(activity);
    // setActivityFlag(true);
  };

  const handleActivityClose = () => {
    setActivityFlag(false);
  };
  return (
    <>
      <CustomTable columns={columns}>
        <CustomContent
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
  const dispatch = useDispatch<AppDispatch>();
  const { handleActivity } = props;
  const { group } = useSelector((state: RootState) => state.group);
  return group?.tasks?.map((task) => {
    // let lastDoneBy =
    //   task?.activity?.length > 0
    //     ? task.activity[task.activity.length - 1]?.lastDoneBy
    //     : null;
    return (
      <TableRow
        key={task._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell scope="row" align="center">
          {task.taskName}
        </TableCell>
        <TableCell scope="row" align="center">
          {task.toBeDoneBy.name}
        </TableCell>
        <TableCell scope="row" align="center">
          {/* {task.} */}
        </TableCell>
        <TableCell scope="row" align="center">
          <Stack direction="row" spacing={2} justifyContent="center">
            <Tooltip title="Mark As Done">
              <IconButton
                color="success"
                onClick={() =>
                  dispatch(
                    markTaskAsDone({
                      taskId: task?._id,
                      groupId: group?._id,
                    } as DeleteTaskReq)
                  )
                }
              >
                <DoneAllIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="See Past Activity">
              <IconButton onClick={() => handleActivity(task._id)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Task">
              <IconButton
                color="error"
                onClick={() =>
                  dispatch(
                    removeTask({
                      taskId: task?._id,
                      groupId: group?._id,
                    } as DeleteTaskReq)
                  )
                }
              >
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
