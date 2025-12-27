import * as React from "react";
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

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
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
            <Button
              component={NavLink}
              to="/sign-in"
              variant="contained"
              sx={CTAButtonSx}
            >
              Sign in
            </Button>
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
                  <Button
                    component={NavLink}
                    to="/sign-in"
                    variant="contained"
                    fullWidth
                  >
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
