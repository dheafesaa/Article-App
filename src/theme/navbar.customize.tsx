import type { SxProps, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

export const appBarSx: SxProps = {
  boxShadow: 0,
  bgcolor: "transparent",
  backgroundImage: "none",
  mt: "calc(var(--template-frame-height, 0px) + 28px)",
};

export const toolbarSx: SxProps<Theme> = (theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: "12px",
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  p: 1.5,
});

export const drawerPaperSx: SxProps = {
  top: "var(--template-frame-height, 0px)",
};

export const boxSx: SxProps = {
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  gap: 2,
};
