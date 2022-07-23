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
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import StoreContext from "../../context/storeContext";
import Product from "../Products/Product/Product";
import useStyles from "./styles";

const ProductDetails = ({ onAddToCart }) => {
  const classes = useStyles();
  const { products } = useContext(StoreContext);
  let { id } = useParams();
  const [value, setValue] = useState(1);
  const product = products.find((x) => x.id === id);
  const data = JSON.parse(localStorage.getItem("items"));
  console.log(
    "🚀 ~ file: ProductDetails.jsx ~ line 24 ~ ProductDetails ~ data",
    data
  );
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("items"));
    if (product) {
      if (!data) {
        localStorage.setItem("items", JSON.stringify([product]));
        console.log(" додало");
        return;
      }

      const dataItem = data.find((item) => item.id === product.id);

      console.log(
        "🚀 ~ file: ProductDetails.jsx ~ line 34 ~ useEffect ~ dataItem",
        dataItem,
        product
      );
      if (!dataItem) {
        localStorage.setItem("items", JSON.stringify([...data, product]));
      }
      return;
    }
  }, []);

  if (product === undefined) return <p>Loading...</p>;

  return (
    <>
      <main>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs={12}
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
            <Grid xs={6}>
              <Typography variant="h5">{product.name}</Typography>
              <Typography
                backgroundcolor="primary"
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
                xs={12}
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
                      if (!Number.isInteger(+e.target.value) || value > 1000) {
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
        <Grid
          container
          justifyContent="center"
          spacing={4}
          style={{ marginTop: "50px", marginBottom: "50px" }}
        >
          <Typography variant="h6">Last reviewed products</Typography>
        </Grid>

        <Grid container justifyContent="center" spacing={4}>
          {data
            ? data.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                  <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
              ))
            : ""}
        </Grid>
      </main>
    </>
  );
};

export default ProductDetails;
