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
import {
  markTaskAsDone,
  removeTask,
  setShowActivity,
} from "../store/groupSlice";

interface CustomTaskProps {
  columns: Array<string>;
}

function Task(props: CustomTaskProps) {
  const { columns } = props;

  return (
    <>
      <CustomTable columns={columns}>
        <CustomContent />
      </CustomTable>
      <CustomActivity />
    </>
  );
}

function CustomContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { group } = useSelector((state: RootState) => state.group);
  const { user } = useSelector((state: RootState) => state.userAuth);

  return group?.tasks?.map((task) => {
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
          <Stack direction="row" spacing={2} justifyContent="center">
            {user?._id === task.toBeDoneBy._id && (
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
            )}
            <Tooltip title="See Past Activity">
              <IconButton onClick={() => dispatch(setShowActivity(task._id))}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
            {user?._id === group.admin && (
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
            )}
          </Stack>
        </TableCell>
      </TableRow>
    );
  });
}

export default Task;
