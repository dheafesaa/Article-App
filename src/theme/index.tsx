import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const theme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "#000000",
    },
    primary: {
      main: "#00B7B5",
    },
    secondary: {
      main: "#005461",
    },
    divider: "#E0E0E0",
  },

  shape: {
    borderRadius: "12px",
  },

  typography: {
    fontFamily: "Poppins, sans-serif",
    allVariants: {
      letterSpacing: "0.03em",
      color: "#000000",
    },

    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.2,
      "@media (max-width:600px)": {
        fontSize: "2.25rem",
      },
    },

    h2: {
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1.25,
      "@media (max-width:600px)": {
        fontSize: "1.75rem",
      },
    },

    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.25,
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },

    h4: {
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.3,
      "@media (max-width:600px)": {
        fontSize: "0.875rem",
      },
    },

    body1: {
      fontSize: "0.875rem",
    },

    body2: {
      fontSize: "0.875rem",
    },
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          minHeight: 48,
          borderRadius: "12px",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E0E0E0",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E0E0E0",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00B7B5",
            borderWidth: 1,
          },

          ...(ownerState.multiline && {
            minHeight: "auto",
          }),
        }),
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginRight: 0,
          marginLeft: 0,
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "#000000",
          fontSize: "0.875rem",
          fontWeight: 600,
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          color: "black",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        loadingIndicator: ({ ownerState }) => ({
          color: ownerState.variant === "contained" ? "#fff" : "inherit",
        }),
        root: {
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: 600,
          borderRadius: "12px",
          padding: "10px 16px",
        },
        containedPrimary: {
          backgroundColor: "#00B7B5",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#009C9A",
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#E0E0E0",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: "0.875rem",
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        },
      },
    },

    MuiPaginationItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-selected": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            border: "none",

            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
          },
        }),
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          backgroundColor: "transparent",

          "&:hover": {
            backgroundColor: "transparent",
          },

          "&.Mui-disabled": {
            color: theme.palette.action.disabled,
          },
        }),
      },
    },

    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          backgroundColor: "#4CAF50",
        },
        root: ({ theme }) => ({
          color: theme.palette.common.white,

          "& .MuiSvgIcon-root": {
            color: theme.palette.common.white,
          },
        }),
      },
    },
  },
});

export default theme;
