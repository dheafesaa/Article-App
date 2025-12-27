import type { SxProps, Theme } from "@mui/material/styles";

export const articleToolbarSx: SxProps<Theme> = {
  display: "flex",
  alignItems: {
    xs: "stretch",
    md: "center",
  },
  justifyContent: "space-between",
  gap: 2,
  pt: 3,

  flexDirection: {
    xs: "column",
    md: "row",
  },
};

export const articleToolbarButtonSx: SxProps<Theme> = {
  width: {
    xs: "100%",
    md: "auto",
  },
};
