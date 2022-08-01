import React from "react";
import Grid from "@material-ui/core/Grid";

import Product from "./Product/Product";
import useStyles from "./styles";
import ReviewedProducts from "../ReviewedProducts/ReviewedProducts";

import CuriosProduct from "../CuriosProducts/CuriosProduct";

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();

  if (!products.length) return <p>Loading...</p>;
  const data = JSON.parse(localStorage.getItem("items"));

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
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
