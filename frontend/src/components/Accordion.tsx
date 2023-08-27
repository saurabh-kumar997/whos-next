import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Group } from "../common/types";
import { onClickPanel } from "../store/CustomAccordionSlice";
import { Button, Grid } from "@mui/material";
import Task from "./Task";
import GroupDetail from "./GroupDetail";
import CustomeDialog from "./Dialog";

interface CustomAccordionProps {
  group: Group;
  groupDetailFlag: boolean;
  handleViewGroupOpen: (groupId: string) => void;
  handleViewGroupClose: () => void;
}
const columns = ["Task", "To Be Done By", "Last Done By", "Actions"];
export default function CustomAccordion(props: CustomAccordionProps) {
  const { group, handleViewGroupClose, groupDetailFlag, handleViewGroupOpen } =
    props;

  const expandedPanel = useSelector(
    (state: RootState) => state.accordion.panel
  );
  const dispatch = useDispatch();

  return (
    <>
      <Accordion
        expanded={expandedPanel === group._id}
        onChange={() => dispatch(onClickPanel(group._id))}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography>{group.groupName}</Typography>
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
                    onClick={() => handleViewGroupOpen(group._id)}
                  >
                    View/Edit Group
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="error">
                    Delete Group
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Task group={group} columns={columns} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <CustomeDialog
        title="Group Details"
        onClose={handleViewGroupClose}
        open={groupDetailFlag}
      >
        <GroupDetail group={group} />
      </CustomeDialog>
    </>
  );
}
