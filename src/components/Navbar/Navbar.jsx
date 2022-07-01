import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Box,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";

import logo from "../../assets/commerce.png";
import { Link } from "react-router-dom";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            gutterBottom
            variant="h5"
            color="inherit"
            className={classes.title}
          >
            <img
              src={logo}
              alt="logo"
              height="40px"
              className={classes.logo}
            ></img>
            Nip Watches
          </Typography>
          <Box className={classes.grow} />
          <Box className={classes.button}>
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show card Item"
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
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
