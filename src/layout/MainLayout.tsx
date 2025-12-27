import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import Snackbar from "@/components/atoms/Snackbar";
import { hideSnackbar } from "@/services/snackbar/snackbar.slice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { key, open, message, severity, context } = useSelector(
    (state: RootState) => state.snackbar
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        mx="auto"
        my={16}
        flex={1}
      >
        <Outlet />
        {context === "main" && (
          <Snackbar
            key={key}
            open={open}
            message={message}
            severity={severity}
            onClose={() => dispatch(hideSnackbar())}
          />
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
