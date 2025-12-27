import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export type CategoryMode = "create" | "edit" | "delete";

export interface CategoryItem {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  mode: CategoryMode;
  initialName?: string;
  category?: CategoryItem | null;
  onClose: () => void;
  onCreate?: (name: string) => void;
  onUpdate?: (c: CategoryItem) => void;
  onDelete?: (id: string) => void;
}

const CategoryDialog = ({
  open,
  mode,
  initialName = "",
  category,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}: Props) => {
  const [name, setName] = React.useState(initialName);

  const handleSubmit = () => {
    if (mode === "create" && name.trim() && onCreate) {
      onCreate(name.trim());
    }

    if (mode === "edit" && category && name.trim() && onUpdate) {
      onUpdate({ ...category, name: name.trim() });
    }

    if (mode === "delete" && category && onDelete) {
      onDelete(category.id);
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {mode === "create" && "Add Category"}
        {mode === "edit" && "Edit Category"}
        {mode === "delete" && "Delete Category"}
      </DialogTitle>

      <DialogContent>
        {mode === "delete" ? (
          <Typography>
            Are you sure you want to delete <strong>{category?.name}</strong>?
          </Typography>
        ) : (
          <TextField
            autoFocus
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color={mode === "delete" ? "error" : "primary"}
          onClick={handleSubmit}
        >
          {mode === "delete" ? "Delete" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDialog;
