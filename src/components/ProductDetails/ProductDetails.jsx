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
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    color="primary"
                    alignItems="center"
                    xs={12}
                    style={{
                      marginTop: "70px",

                      maxWidth: "75%",

                      borderRadius: "40px",
                    }}
                  >
                    <CardMedia
                      className={classes.media}
                      image={product.image.url}
                      title="lore"
                    />
                    <Grid item xs={6}>
                      <Typography variant="h5">{product.name}</Typography>
                      <Typography
                        backgroundColor="primary"
                        style={{
                          maxWidth: "100%",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                        component="p"
                      />

                      <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          disabled={value === 0}
                          onClick={() => onAddToCart(product.id, value)}
                        >
                          add to cart
                        </Button>
                        <Box>
                          <Button
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
                            type="button"
                            size="small"
                            onClick={(e) => {
                              setValue(value + 1);
                            }}
                          >
                            +
                          </Button>
                        </Box>
                        <Typography variant="h6" color="primary">
                          {product.price.formatted_with_symbol}
                        </Typography>
                      </Grid>
                    </Grid>
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
