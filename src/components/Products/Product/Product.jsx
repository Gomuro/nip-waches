import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles.js";

const Product = ({ product }) => {
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <CardMedia image={product.image} title={product.name}>
        <Box>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {product.price}
          </Typography>
        </Box>
      </CardMedia>
    </Card>
  );
};

export default Product;
{
  /* <div class="container">
  <div class="card">
    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXMlMjBuaWtlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" alt="" />
    <div class="card-body">
      <div class="row">
        <div class="card-title">
          <h4>Nike Sneaker</h4>
          <h3>$120</h3>
        </div>
        <div class="view-btn">
          <a href="">View Details</a>
        </div>
      </div>
      <hr />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
        dignissimos.
      </p>
      <div class="btn-group">
        <div class="btn">
          <a href="">Buy Now</a>
        </div>
        <a href=""> Cancel</a>
      </div>
    </div>
  </div>
</div> */
}
