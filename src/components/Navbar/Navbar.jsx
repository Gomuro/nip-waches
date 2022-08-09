import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
  Box,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  Search,
  ShoppingCart,
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from "@material-ui/icons";

import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

import useStyles from "./styles";
import { ListItemButton } from "@mui/material";
import MenuComponent from "./MenuComponent/MenuComponent";

const PrimarySearchAppBar = ({ totalItems }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const classes = useStyles();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          component={Link}
          to="/cart"
          aria-label="Show cart items"
          color="inherit"
        >
          <Badge
            overlap="rectangular"
            badgeContent={totalItems}
            color="secondary"
          >
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Nip Watches
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Search>
                <SearchIcon />
              </Search>
              <div className={classes.button}>
                <IconButton
                  component={Link}
                  to="/cart"
                  aria-label="Show cart items"
                  color="inherit"
                >
                  <Badge
                    overlap="rectangular"
                    badgeContent={totalItems}
                    color="secondary"
                  >
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </div>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={() => {
                  setToggleMenu((toggleMenu) => {
                    return !toggleMenu;
                  });
                }}
              >
                {toggleMenu ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={toggleMenu}
        onClose={() => {
          setToggleMenu(!toggleMenu);
        }}
      >
        <MenuComponent />
      </Drawer>
      {renderMobileMenu}
    </>
  );
};

export default PrimarySearchAppBar;
{
  /* <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            Nip Watches
          </Typography>
          <div className={classes.grow} />

          <div className={classes.button}>
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge
                overlap="rectangular"
                badgeContent={totalItems}
                color="secondary"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar> */
}
