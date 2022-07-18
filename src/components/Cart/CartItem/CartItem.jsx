import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import useStyles from "./styles";

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();
  const [value, setValue] = useState(item.quantity);

  const handleUpdateCartQty = (lineItemId, newQuantity) =>
    onUpdateCartQty(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

  useEffect(() => {
    let timerId = null;
    if (value) {
      timerId = setTimeout(() => {
        handleUpdateCartQty(item.id, (item.quantity = value));
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [value]);

  return (
    <Card className="cart-item">
      <CardMedia
        image={item.image.url}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
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
          <Typography>&nbsp;{value}&nbsp;</Typography>
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
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
