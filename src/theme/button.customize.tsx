import type { SxProps, Theme } from "@mui/material/styles";

export const navButtonSx: SxProps<Theme> = {
  color: "text.primary",
  fontWeight: 400,
  textTransform: "none",

  "&:not(.active):hover": {
    backgroundColor: "transparent",
    fontWeight: 600,
  },

  "&.active": {
    fontWeight: 600,
    pointerEvents: "none",
  },
};

export const CTAButtonSx: SxProps<Theme> = {
  padding: "6px 18px",
};

export const getStartedButtonSx: SxProps<Theme> = {
  backgroundColor: "common.white",
  color: "text.primary",
  padding: "10px 32px",
  boxShadow: "none",

  transition:
    "transform 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease",

  "&:hover": {
    backgroundColor: "grey.100",
    boxShadow: "none",
    transform: "translateY(-4px) scale(1.02)",
  },
};

export const articleButtonSx: SxProps<Theme> = {
  width: {
    xs: "100%",
    md: "auto",
  },
  py: {
    xs: "10px",
    md: "6px",
  },
};

export const CTAButtonTextSx: SxProps<Theme> = {
  padding: "6px 0px",
};
