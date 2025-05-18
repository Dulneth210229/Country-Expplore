import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Home,
  Public,
  Favorite,
  ExitToApp,
  Login,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout, login } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Explore Countries", icon: <Public />, path: "/countries" },
    ...(currentUser
      ? [{ text: "Favorites", icon: <Favorite />, path: "/favorites" }]
      : []),
  ];

  const drawerContent = (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ width: 250 }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ my: 2 }}>
          Country Explorer
        </Typography>
        {currentUser && (
          <Box sx={{ mb: 2, textAlign: "center" }}>
            <AccountCircle fontSize="large" />
            <Typography variant="body2">
              {currentUser.displayName || currentUser.email}
            </Typography>
          </Box>
        )}
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
          >
            <IconButton>{item.icon}</IconButton>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider />
        {currentUser ? (
          <ListItem button onClick={handleLogout}>
            <IconButton>
              <ExitToApp />
            </IconButton>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button onClick={handleLogin}>
            <IconButton>
              <Login />
            </IconButton>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Container>
          <Toolbar>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
            >
              Country Explorer
            </Typography>
            {!isMobile && (
              <Box sx={{ display: "flex" }}>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    component={RouterLink}
                    to={item.path}
                    startIcon={item.icon}
                  >
                    {item.text}
                  </Button>
                ))}
                {currentUser ? (
                  <Button
                    color="inherit"
                    onClick={handleLogout}
                    startIcon={<ExitToApp />}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    color="inherit"
                    onClick={handleLogin}
                    startIcon={<Login />}
                  >
                    Login
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Navbar;
