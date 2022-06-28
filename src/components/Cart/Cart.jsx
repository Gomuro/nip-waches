import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";

import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";

const Cart = ({ cart }) => {
  const classes = useStyles();
  const subTotal = cart.subtotal.formatted_with_code;
  console.log("🚀 ~ file: cart.jsx ~ line 10 ~ Cart ~ subTotal", subTotal);

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart
    </Typography>
  );

  if (!cart.line_items) return "Loading";

  const renderCart = () => (
    <>
      <Grid container className={classes.itemsContainer}>
        {cart.line_items.map((lineItem) => (
          <CartItem key={lineItem.id} lineItem={lineItem} />
        ))}
      </Grid>
      <Typography variant="subtitle1">SubTotal:{subTotal}</Typography>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? renderEmptyCart() : renderCart()}
    </Container>
  );
};

export default Cart;
