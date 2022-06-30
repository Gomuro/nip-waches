import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  TextField,
} from "@material-ui/core";

import StoreContext from "../../../context/storeContext";

import useStyles from "./styles";

const CartItem = ({ lineItem }) => {
  const classes = useStyles();
  const { onUpdateCartQty, onRemoveFromCart } = useContext(StoreContext);
  const [value, setValue] = useState(lineItem.quantity);
  console.log(!value);
  const handleUpdateCartQty = (lineItemId, newQuantity) =>
    onUpdateCartQty(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);
  useEffect(() => {
    let timerId = null;
    if (value) {
      timerId = setTimeout(() => {
        handleUpdateCartQty(lineItem.id, (lineItem.quantity = value));
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [value]);

  return (
    <Card className={classes.card}>
      <CardMedia
        image={lineItem.image.url}
        alt={lineItem.name}
        className={classes.media}
      />
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => setValue(+value - 1)}
          >
            -
          </Button>
          <TextField
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            type="button"
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => setValue(+value + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="outlined"
          type="button"
          color="secondary"
          onClick={() => handleRemoveFromCart(lineItem.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

// if (!cart.line_items && !cart.subtotal) return "Loading";

export default CartItem;
