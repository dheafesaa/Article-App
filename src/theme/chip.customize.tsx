import type { SxProps, Theme } from "@mui/material/styles";

export const categoryChipSx =
  (isActive: boolean): SxProps<Theme> =>
  (theme) => ({
    px: 1,
    height: 36,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: isActive ? 600 : 400,
    backgroundColor: isActive ? theme.palette.secondary.main : "transparent",
    color: isActive ? theme.palette.common.white : theme.palette.text.primary,
    border: "none",

    "&:hover": {
      backgroundColor: isActive
        ? theme.palette.secondary.main
        : theme.palette.action.hover,
    },
  });
