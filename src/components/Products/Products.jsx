import React from "react";
import { Grid } from "@material-ui/core";

import Product from "./Product/Product.jsx";

const products = [
  {
    id: "1",
    name: "Macbook",
    description: "Apple Macbook",
    price: "100",
    image:
      "https://cdn1.it4profit.com/AfrOrF3gWeDA6VOlDG4TzxMv39O7MXnF4CXpKUwGqRM/resize:fill:540/bg:f6f6f6/q:100/plain/s3://catalog-products/201111082128206860/201210170015136250.png@webp",
  },
];
const Products = () => {
  return (
    <main>
      <div />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
