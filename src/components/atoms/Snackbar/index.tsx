import { Snackbar as SnackbarMUI, Alert } from "@mui/material";
import type { SnackbarSeverity } from "@/types/snackbar.types";

interface Props {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
  onClose: () => void;
}

const Snackbar = ({ open, message, severity, onClose }: Props) => {
  return (
    <SnackbarMUI
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </SnackbarMUI>
  );
};

export default Snackbar;
