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
import {
  AddShoppingCartOutlined,
  RemoveShoppingCartOutlined,
} from "@material-ui/icons";

import useStyles from "./styles";

const Product = ({ product, onAddToCart, handleRemoveToCart }) => {
  const classes = useStyles();

  const handleAddToCart = () => onAddToCart(product.id, 1);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.media.source}
        title={product.name}
      />
      <CardContent>
        <Box className={classes.cardContent}>
          <Box className={classes.row}>
            <Box className={classes.cardtitle}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                ${product.price.formatted}
              </Typography>
            </Box>
          </Box>
        </Box>
        <hr />

        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body1"
          color="text"
          component="p"
        />
        <Box className={classes.btnGroup}>
          <Box>
            <CardActions disableSpacing className={classes.cardActions}>
              <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
                <AddShoppingCartOutlined color="primary" />
              </IconButton>
            </CardActions>
          </Box>
          <Box>
            <CardActions disableSpacing className={classes.cardActions}>
              <IconButton aria-label="Add to Cart" onClick={handleRemoveToCart}>
                <RemoveShoppingCartOutlined color="error" />
              </IconButton>
            </CardActions>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Product;
