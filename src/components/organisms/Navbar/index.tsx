import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Divider,
  MenuItem,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArticleAppLogo from "@/assets/article-app.png";
import Logo from "@/components/atoms/Logo";
import {
  appBarSx,
  toolbarSx,
  drawerPaperSx,
  boxSx,
} from "@/theme/navbar.customize";
import { CTAButtonSx } from "@/theme/button.customize";
import NavButton from "@/components/molecules/NavButton";
import NavMenuItem from "@/components/molecules/NavMenuItem";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { logout } from "@/services/auth/auth.slice";
import { showSnackbar } from "@/services/snackbar/snackbar.slice";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [open, setOpen] = useState(false);

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
  };

  const handleLogout = () => {
    dispatch(
      showSnackbar({
        message: "Logged out successfully",
        severity: "success",
      })
    );

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(logout());
    }, 1500);
  };

  return (
    <AppBar position="fixed" enableColorOnDark sx={appBarSx}>
      <Container maxWidth="lg">
        <Toolbar variant="dense" disableGutters sx={toolbarSx}>
          <Box sx={boxSx}>
            <Logo src={ArticleAppLogo} name="Depscape" />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <NavButton to="/">Home</NavButton>
                <NavButton to="/article">Article</NavButton>
                <NavButton to="/profile">Profile</NavButton>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {isAuthenticated ? (
              <Button
                variant="contained"
                onClick={handleLogout}
                sx={CTAButtonSx}
              >
                Logout
              </Button>
            ) : (
              <Button
                component={NavLink}
                to="/sign-in"
                variant="contained"
                sx={CTAButtonSx}
              >
                Sign in
              </Button>
            )}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              slotProps={{
                paper: {
                  sx: drawerPaperSx,
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <NavMenuItem to="/" end onClick={toggleDrawer(false)}>
                  Home
                </NavMenuItem>
                <NavMenuItem to="/article" onClick={toggleDrawer(false)}>
                  Article
                </NavMenuItem>
                <NavMenuItem to="/profile" onClick={toggleDrawer(false)}>
                  Profile
                </NavMenuItem>
                <Box sx={{ my: 3 }}>
                  <Divider />
                </Box>
                <MenuItem>
                  {isAuthenticated ? (
                    <Button
                      variant="contained"
                      onClick={handleLogout}
                      fullWidth
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      component={NavLink}
                      to="/sign-in"
                      variant="contained"
                      fullWidth
                    >
                      Sign in
                    </Button>
                  )}
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
