import {
  Autocomplete,
  TextField,
  IconButton,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import CategoryDialog, {
  type CategoryItem,
  type CategoryMode,
} from "@/components/molecules/CategoryDialog";

interface Props {
  value: CategoryItem | null;
  options: CategoryItem[];
  onChange: (v: CategoryItem | null) => void;
  onCreate?: (name: string) => void;
  onUpdate?: (c: CategoryItem) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
  error?: boolean;
  helperText?: string;
}

const CategorySelect = ({
  value,
  options,
  onChange,
  onCreate,
  onUpdate,
  onDelete,
  loading = false,
  error = false,
  helperText,
}: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [dialog, setDialog] = useState<{
    open: boolean;
    mode: CategoryMode;
    category?: CategoryItem | null;
    initialName?: string;
  }>({ open: false, mode: "create" });

  const hasMatch = options.some(
    (o) => o.name.toLowerCase() === inputValue.toLowerCase()
  );

  return (
    <>
      <Autocomplete
        loading={loading}
        value={value}
        inputValue={inputValue}
        onInputChange={(_, v) => setInputValue(v)}
        options={options}
        getOptionLabel={(o) => o.name}
        isOptionEqualToValue={(a, b) => a.id === b.id}
        onChange={(_, v) => onChange(v)}
        noOptionsText={
          inputValue && !hasMatch && onCreate ? (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() =>
                setDialog({
                  open: true,
                  mode: "create",
                  initialName: inputValue,
                })
              }
            >
              <AddIcon fontSize="small" />
              <Typography>Add New Category</Typography>
            </Stack>
          ) : (
            "No categories"
          )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            placeholder="Select category"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    {loading && <CircularProgress color="inherit" size={16} />}
                    {value && (
                      <>
                        {onUpdate && (
                          <IconButton
                            size="small"
                            onClick={() =>
                              setDialog({
                                open: true,
                                mode: "edit",
                                category: value,
                                initialName: value.name,
                              })
                            }
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        )}

                        {onDelete && (
                          <IconButton
                            size="small"
                            onClick={() =>
                              setDialog({
                                open: true,
                                mode: "delete",
                                category: value,
                              })
                            }
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </>
                    )}
                    {params.InputProps.endAdornment}
                  </Stack>
                ),
              },
            }}
          />
        )}
      />
      <CategoryDialog
        key={`${dialog.mode}-${dialog.category?.id ?? dialog.initialName}`}
        open={dialog.open}
        mode={dialog.mode}
        category={dialog.category}
        initialName={dialog.initialName}
        onClose={() => setDialog((p) => ({ ...p, open: false }))}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </>
  );
};

export default CategorySelect;
