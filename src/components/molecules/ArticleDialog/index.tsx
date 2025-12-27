import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

interface ArticleDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ArticleDialog = ({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onClose,
  onConfirm,
}: ArticleDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          color="inherit"
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            confirmText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArticleDialog;
