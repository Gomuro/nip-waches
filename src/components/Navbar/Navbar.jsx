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

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            <img
              src={logo}
              alt="logo"
              height="40px"
              className={classes.logo}
            ></img>
            nipwatches
          </Typography>
          <Box className={classes.grow} />
          <Box className={classes.button}>
            <IconButton aria-label="Show card Item" color="inherit">
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
