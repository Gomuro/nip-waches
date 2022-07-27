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
        <Typography variant="h6">Last reviewed products</Typography>
      </Grid>
      {data
        ? data.map((product) => (
            <>
              <Grid
                container
                key={product.id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                justifyContent="center"
                alignItems="center"
              >
                <TinyProduct key={product.id} product={product} />
              </Grid>
            </>
          ))
        : ""}
    </Grid>
  );
};

export default ReviewedProducts;
