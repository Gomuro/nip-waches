import { Container, Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { useParams } from "react-router";
import StoreContext from "../../context/storeContext";
import useStyles from "./styles";
const ProductDetails = () => {
  const classes = useStyles();
  const { products } = useContext(StoreContext);
  let { id } = useParams();

  if (products === undefined) return <p>Loading...</p>;

  return (
    <div>
      {products.map((product) => {
        if (product.id === id) {
          return (
            <>
              <Container maxWidth="sm" className={classes.container}>
                <h1>{product.name}</h1>
              </Container>
            </>
          );
        }
      })}
    </div>
  );
};

export default ProductDetails;
