import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { DeleteTaskReq, Group } from "../common/types";
import {
  deleteGroup,
  onClickPanel,
  setGroupDetailFlag,
} from "../store/groupSlice";
import { Button, Grid } from "@mui/material";
import Task from "./Task";
import GroupDetail from "./GroupDetail";
import CustomeDialog from "./Dialog";

interface CustomAccordionProps {
  group: Group;
}
const columns = ["Task", "To Be Done By", "Last Done By", "Actions"];
export default function CustomAccordion(props: CustomAccordionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { group } = props;

  const { groupId, groupDetailFlag } = useSelector(
    (state: RootState) => state.group
  );

  return (
    <>
      <Accordion
        expanded={group?._id === groupId}
        onChange={() => dispatch(onClickPanel(group?._id))}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography>{group?.groupName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="strech"
          >
            <Grid item>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                  <Button
                    variant="contained"
                    // onClick={() => dispatch(setGroupDetailFlag())}
                  >
                    Add Tasks
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => dispatch(setGroupDetailFlag())}
                  >
                    View/Edit Group
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => dispatch(deleteGroup(group?._id as string))}
                  >
                    Delete Group
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Task columns={columns} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <CustomeDialog
        title="Group Details"
        onClose={() => dispatch(setGroupDetailFlag())}
        open={groupDetailFlag}
      >
        <GroupDetail group={group} />
      </CustomeDialog>
    </>
  );
}
