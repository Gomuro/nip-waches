import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  TextField,
  Typography,
} from "@material-ui/core";

import StoreContext from "../../../context/storeContext";

import useStyles from "./styles";

const CartItem = ({ lineItem }) => {
  const classes = useStyles();
  const { onUpdateCartQty, onRemoveFromCart } = useContext(StoreContext);
  console.log(
    "🚀 ~ file: CartItem.jsx ~ line 15 ~ CartItem ~ lineItem",
    lineItem
  );
  const [value, setValue] = useState(lineItem.quantity);
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
      <Typography variant="h5">
        {lineItem.price.formatted_with_symbol}
      </Typography>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            className={classes.button}
            type="button"
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => setValue(+value - 1)}
            disabled={value === 1 || value < 1 ? true : false}
          >
            -
          </Button>

          <TextField
            className={classes.textField}
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

export default CartItem;
