import { Link, List, ListItem, ListItemText } from "@material-ui/core";
import { ListItemButton } from "@mui/material";
import React from "react";

const MenuComponent = () => {
  return (
    <List>
      {[
        { text: "Home", link: "/" },
        { text: "Cart", link: "/cart" },
        { text: "Checkout", link: "/checkout" },
        { text: "Categories", link: "/" },
      ].map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemButton component={Link} to={item.link}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuComponent;
