import { FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface SearchInputProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function SearchInput({
  value,
  placeholder = "Search",
  onChange,
}: SearchInputProps) {
  return (
    <FormControl
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 370,
        alignSelf: "center",
      }}
    >
      <OutlinedInput
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        size="small"
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
        sx={{
          borderRadius: 1.5,

          "& fieldset": {
            borderColor: "divider",
          },

          "&:hover fieldset": {
            borderColor: "text.primary",
          },

          "&.Mui-focused fieldset": {
            borderColor: "primary.main",
            borderWidth: 1,
          },
        }}
      />
    </FormControl>
  );
}
