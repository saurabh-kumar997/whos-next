import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { ReactElement } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface CustomeDialogProps {
  title: string;
  open: boolean;
  onClose?: () => void;
  children: ReactElement;
  showCloseIcon?: boolean;
}
export default function CustomeDialog(props: CustomeDialogProps) {
  const { title, open, onClose, children, showCloseIcon = true } = props;

  return (
    <>
      <Dialog fullWidth maxWidth={"lg"} open={open}>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            <h4>{title}</h4>
            {showCloseIcon && (
              <Tooltip title="Close">
                <IconButton onClick={onClose} color="error" size="large">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </>
  );
}
