import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  CardActionArea,
  CardHeader,
  Avatar,
  Grid,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import useStyles from "./styles";
import { Link } from "react-router-dom";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  const handleAddToCart = () => onAddToCart(product.id, 1);
  console.log("🚀 ~ file: Product.jsx ~ line 44 ~ Product ~ product", product);
  return (
    <Card className={classes.root}>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <CardActionArea component={Link} to={`/products/${product.id}`}>
          <CardHeader title={product.name} subheader="Card sub heading" />
          <CardMedia
            className={classes.media}
            image={product.image.url}
            title={product.name}
          />
          <CardContent>
            <div className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.price.formatted_with_symbol}
              </Typography>
            </div>

            <Typography
              dangerouslySetInnerHTML={{
                __html:
                  product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description,
              }}
              variant="body2"
              color="textSecondary"
              component="p"
            />
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton
            aria-label="Add to Cart"
            onClick={handleAddToCart}
            color="primary"
          >
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Grid>
    </Card>
  );
};

export default Product;
