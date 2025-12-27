import Snackbar from "@/components/atoms/Snackbar";
import { hideSnackbar } from "@/services/snackbar/snackbar.slice";
import type { RootState } from "@/store";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state: RootState) => state.snackbar
  );

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Outlet />
      <Snackbar
        open={open}
        message={message}
        severity={severity}
        onClose={() => dispatch(hideSnackbar())}
      />
    </Box>
  );
};

export default AuthLayout;
