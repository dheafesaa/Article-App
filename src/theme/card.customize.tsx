import type { SxProps, Theme } from "@mui/material/styles";

export const CardAuth: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  margin: "auto",

  [theme.breakpoints.up("sm")]: {
    maxWidth: 450,
  },

  boxShadow:
    theme.palette.mode === "dark"
      ? "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px"
      : "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
});

export const CardStory: SxProps<Theme> = (theme) => ({
  px: { xs: 2, md: 4 },
  py: { xs: 4, md: 8 },
  borderRadius: theme.spacing(1.5),
  gap: theme.spacing(3),
  backgroundColor: "#018790",
  textAlign: "center",
});

export const CardFeatures: SxProps<Theme> = (theme) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1.5),
  gap: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  border: `1px solid ${theme.palette.secondary.main}`,
  transition:
    "transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, color 0.25s ease",

  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: theme.shadows[8],
  },

  "&:hover .MuiTypography-root": {
    color: "#FFF",
  },
});

export const CardArticle: SxProps<Theme> = (theme) => ({
  borderRadius: theme.spacing(1.5),
  cursor: "pointer",
  border: "1px solid",
  height: "100%",
  boxShadow: "none",
  borderColor: "divider",
  overflow: "hidden",
  transition:
    "transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, color 0.25s ease",

  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: theme.shadows[8],
  },
});
