import {
  Box,
  Button,
  ButtonBase,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import StoreContext from "../../context/storeContext";
import useStyles from "./styles";

const ProductDetails = ({ onAddToCart }) => {
  const classes = useStyles();
  const { products } = useContext(StoreContext);
  let { id } = useParams();
  const [value, setValue] = useState(1);

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
                <Grid container justify="center" style={{ marginTop: "100px" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CardMedia
                      style={{
                        height: "600px",
                        width: "600px",
                        hover: {
                          backgroundColor: "green",
                          color: "white",
                        },
                      }}
                      image={product.image.url}
                      title="lore"
                    />
                  </Grid>

                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      variant="outlined"
                      className={classes.iconButton}
                      disabled={value === 0}
                      onClick={() => onAddToCart(product.id, value)}
                    >
                      add to cart
                    </Button>
                    <Box>
                      <Grid
                        container
                        justifyContent="space-around"
                        alignItems="center"
                      >
                        <Button
                          variant="outlined"
                          type="button"
                          size="small"
                          onClick={(e) => {
                            if (value === 0) return;
                            setValue(value - 1);
                          }}
                        >
                          -
                        </Button>

                        <TextField
                          style={{ width: "40px" }}
                          size="small"
                          label="quantity"
                          value={value}
                          onChange={(e) => {
                            if (
                              !Number.isInteger(+e.target.value) ||
                              value > 1000
                            ) {
                              return;
                            }
                            setValue(e.target.value);
                          }}
                        ></TextField>

                        <Button
                          variant="outlined"
                          type="button"
                          size="small"
                          onClick={(e) => {
                            setValue(value + 1);
                          }}
                        >
                          +
                        </Button>
                      </Grid>
                    </Box>
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography variant="h6">
                      {product.price.formatted_with_symbol}
                    </Typography>

                    <Typography
                      style={{ maxWidth: "70%" }}
                      dangerouslySetInnerHTML={{
                        __html: product.description,
                      }}
                      variant="body1"
                      color="textPrimary"
                      component="p"
                    />
                  </Grid>
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
