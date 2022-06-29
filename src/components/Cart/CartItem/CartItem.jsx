import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import useStyles from "./styles";

const CartItem = ({ lineItem, onUpdateCartQty, onRemoveToCart }) => {
  const classes = useStyles();

  return (
    <Card className="cart-item">
      <CardMedia
        image={lineItem.image.url}
        alt={lineItem.name}
        className={classes.media}
      />
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small">
            -
          </Button>
          <Typography>&nbsp;{lineItem.quantity}&nbsp;</Typography>
          <Button type="button" size="small">
            +
          </Button>
        </div>
        <Button variant="outlined" type="button" color="secondary">
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
