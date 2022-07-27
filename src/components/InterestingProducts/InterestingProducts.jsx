import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import StoreContext from "../../context/storeContext";
import TinyProduct from "../Products/TinyProduct/TinyProduct";

const InterestingProducts = () => {
  const categories = JSON.parse(localStorage.getItem("categories"));
  const { products } = useContext(StoreContext);

  const filteredProducts = categories.reduce((acc, category) => {
    return [
      ...acc,
      {
        ...category,
        productsData: products.filter((product) =>
          product.categories.find((cat) => cat.id === category.id)
        ),
      },
    ];
  }, []);
  const finalProducts = filteredProducts.reduce(
    (total, categoryWithProducts) => {
      total.push(...categoryWithProducts.productsData);

      return total;
    },
    []
  );

  return (
    <>
      <Grid container justifyContent="center" direction="row">
        {/* <Grid
          container
          justifyContent="center"
          spacing={4}
          style={{ marginTop: "50px", marginBottom: "50px" }}
        >
          <Typography variant="h6">Last reviewed products</Typography>
        </Grid> */}
        {finalProducts
          ? finalProducts.map((product) => (
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
    </>
  );
};

export default InterestingProducts;
