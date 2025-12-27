import { TextField as MuiTextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";

interface TextAreaProps extends Omit<TextFieldProps, "type" | "rows"> {
  minRows?: number;
  maxRows?: number;
}

const TextArea = ({ minRows = 4, maxRows = 8, ...props }: TextAreaProps) => {
  return (
    <MuiTextField
      {...props}
      multiline
      minRows={minRows}
      maxRows={maxRows}
      variant="outlined"
      fullWidth
    />
  );
};

export default TextArea;
