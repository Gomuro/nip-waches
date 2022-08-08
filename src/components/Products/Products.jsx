import React from "react";
import Grid from "@material-ui/core/Grid";

import Product from "./Product/Product";
import useStyles from "./styles";
import ReviewedProducts from "../ReviewedProducts/ReviewedProducts";

import CuriosProduct from "../CuriosProducts/CuriosProduct";
import { Typography } from "@material-ui/core";

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();

  if (!products.length) return <p>Loading...</p>;
  const data = JSON.parse(localStorage.getItem("items"));

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <Grid container justifyContent="center" spacing={4}>
        <Grid
          container
          justifyContent="center"
          spacing={4}
          style={{ marginTop: "20px", marginBottom: "15px" }}
        >
          <Typography variant="h4" color="textSecondary">
            Top of sales
          </Typography>
        </Grid>
        {products.map((product) => (
          <Grid
            key={product.id}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            container
            justifyContent="center"
            spacing={4}
            style={{ marginTop: "50px", marginBottom: "50px" }}
          >
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
      <CuriosProduct />

      {data ? <ReviewedProducts /> : ""}
    </main>
  );
};

export default Products;
