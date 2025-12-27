import {
  TextField as MuiTextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type CustomTextFieldProps = {
  isPassword?: boolean;
} & TextFieldProps;

const TextField = ({ isPassword, type, ...props }: CustomTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MuiTextField
      {...props}
      type={isPassword && showPassword ? "text" : type}
      variant="outlined"
      fullWidth
      slotProps={{
        input: {
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
};

export default TextField;
