import {
  Box,
  Button,
  ButtonBase,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { useParams } from "react-router";
import StoreContext from "../../context/storeContext";
import useStyles from "./styles";

const ProductDetails = () => {
  const classes = useStyles();
  const { products } = useContext(StoreContext);
  let { id } = useParams();

  if (products === undefined) return <p>Loading...</p>;

  return (
    <>
      {products.map((product) => {
        if (product.id === id) {
          console.log(
            "🚀 ~ file: ProductDetails.jsx ~ line 17 ~ products.map ~ product",
            product
          );

          return (
            <>
              <main>
                <Grid
                  key={product.id}
                  style={{ marginTop: "75px" }}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <CardMedia
                      style={{ height: "600px", width: "600px" }}
                      image={product.image.url}
                      title="lorem ipsum"
                    />
                  </Box>
                  <Box>
                    <Button variant="outlined" className={classes.iconButton}>
                      add to cart
                    </Button>
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography variant="h6">
                      {product.price.formatted_with_symbol}
                    </Typography>

                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: product.description,
                      }}
                      variant="body1"
                      color="textPrimary"
                      component="p"
                    />
                  </Box>
                </Grid>
              </main>
            </>
          );
        }
      })}
    </>
  );
};

export default ProductDetails;
