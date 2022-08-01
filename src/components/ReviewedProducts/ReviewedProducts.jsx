import { Grid, Typography } from "@material-ui/core";
import React from "react";
import TinyProduct from "../Products/TinyProduct/TinyProduct";

const ReviewedProducts = () => {
  const data = JSON.parse(localStorage.getItem("items"));
  return (
    <Grid container justifyContent="center" direction="row-reverse">
      <Grid
        container
        justifyContent="center"
        spacing={4}
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        <Typography variant="h4" color="textSecondary">
          Last reviewed products
        </Typography>
      </Grid>
      {data
        ? data.map((product) => (
            <>
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
                <TinyProduct product={product} />
              </Grid>
            </>
          ))
        : ""}
    </Grid>
  );
};

export default ReviewedProducts;
