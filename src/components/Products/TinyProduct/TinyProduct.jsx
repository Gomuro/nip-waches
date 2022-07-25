import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  CardHeader,
  Grid,
} from "@material-ui/core";

import useStyles from "./styles";
import { Link } from "react-router-dom";

const TinyProduct = ({ product }) => {
  const classes = useStyles();
  if (product === undefined) return <p>Loading...</p>;
  return (
    <Card className={classes.root}>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <CardActionArea component={Link} to={`/products/${product.id}`}>
          <CardMedia
            className={classes.media}
            image={product.image.url}
            title={product.name}
          />
          <CardHeader title={product.name} />
          <CardContent>
            <div className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.price.formatted_with_symbol}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Grid>
    </Card>
  );
};

export default TinyProduct;
