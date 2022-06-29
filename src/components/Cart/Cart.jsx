import React from "react";
import { Container, Typography, Button, Grid, Box } from "@material-ui/core";

import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart
    </Typography>
  );
  if (!cart.line_items && !cart.subtotal) return "Loading";

  const renderCart = () => (
    <>
      <Grid container className={classes.itemsContainer}>
        {cart.line_items.map((lineItem) => (
          <CartItem
            key={lineItem.id}
            lineItem={lineItem}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </Grid>
      <Box className={classes.cartDetails}>
        <Typography variant="h5">
          SubTotal:
          {cart.subtotal.formatted_with_code}
        </Typography>
        <Box>
          <Button
            className={classes.emptyButton}
            type="button"
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            type="button"
            size="small"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.id ? renderEmptyCart() : renderCart()}
    </Container>
  );
};

export default Cart;
