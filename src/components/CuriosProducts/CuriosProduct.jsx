import { Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import StoreContext from "../../context/storeContext";
import TinyProduct from "../Products/TinyProduct/TinyProduct";

function CuriosProduct() {
  const categories = JSON.parse(localStorage.getItem("categories"));
  const { products } = useContext(StoreContext);
  if (!categories) return;
  const filteredProducts = categories.reduce((total, category) => {
    const productsData = products.filter((product) =>
      product.categories.find((c) => c.id === category.id)
    );

    total.push(...productsData);

    return total;
  }, []);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row-reverse"
      >
        <Grid
          container
          justifyContent="center"
          spacing={4}
          style={{ marginTop: "50px", marginBottom: "50px" }}
        >
          <Typography variant="h4" color="textSecondary">
            You may also be interested
          </Typography>
        </Grid>
        <Grid container justifyContent="center" spacing={4}>
          {filteredProducts.map((product) => (
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
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default CuriosProduct;
