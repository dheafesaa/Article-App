import type { SnackbarContext, SnackbarSeverity } from "@/types/snackbar.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
  context: SnackbarContext;
  key: number;
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  severity: "info",
  context: "main",
  key: 0,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar(
      state,
      action: PayloadAction<{
        message: string;
        severity?: SnackbarSeverity;
        context?: SnackbarContext;
      }>
    ) {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity ?? "info";
      state.context = action.payload.context ?? "main";
      state.key += 1;
    },
    hideSnackbar(state) {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
