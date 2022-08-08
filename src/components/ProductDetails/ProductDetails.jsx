import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import StoreContext from "../../context/storeContext";
import ReviewedProducts from "../ReviewedProducts/ReviewedProducts";
import useStyles from "./styles";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";

const ProductDetails = ({ onAddToCart }) => {
  const classes = useStyles();
  const { products } = useContext(StoreContext);
  let { id } = useParams();
  const product = products.find((x) => x.id === id);
  const [value, setValue] = useState(1);
  const [imageValue, setImageValue] = useState("");
  const [couterValue, setCouterValue] = useState(1);

  const data = JSON.parse(localStorage.getItem("items"));
  const categories = JSON.parse(localStorage.getItem("categories"));

  useEffect(() => {
    if (product) {
      const category = product.categories.find((c) => c);
      if (!data) {
        localStorage.setItem("items", JSON.stringify([product]));
        if (!categories) {
          localStorage.setItem("categories", JSON.stringify([category]));
        }
        return;
      }

      const dataItem = data.find((item) => item.id === product.id);

      if (!dataItem) {
        localStorage.setItem("items", JSON.stringify([...data, product]));
      }
      const categoryCheker = categories.find((cat) => cat.id === category.id);

      if (!categoryCheker) {
        localStorage.setItem(
          "categories",
          JSON.stringify([...categories, category])
        );
      }
      if (data.length >= 9) {
        data.splice(0, 1);

        localStorage.setItem("items", JSON.stringify([...data, product]));
      }
      setImageValue(product.image.url);
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
          item
          xs={12}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            color="primary"
            alignItems="center"
            item
            spacing={10}
            xs={12}
            style={{
              marginTop: "70px",

              maxWidth: "75%",

              borderRadius: "40px",
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              item
            >
              <Button
                onClick={() => {
                  const items = product.assets;
                  if (couterValue === 0) return;
                  console.log(
                    "🚀 ~ file: ProductDetails.jsx ~ line 107 ~ ProductDetails ~ couterValue",
                    couterValue
                  );
                  setCouterValue((couterValue) => couterValue - 1);
                  const item = items[couterValue];
                  setImageValue(items[couterValue].url);
                  console.log(
                    "🚀 ~ file: ProductDetails.jsx ~ line 117 ~ ProductDetails ~ item",
                    item.url,
                    couterValue
                  );
                }}
              >
                <ArrowBackIosOutlined />
              </Button>
              <CardMedia
                className={classes.media}
                image={imageValue ? imageValue : product.image.url}
                title="lore"
              />
              <Button
                onClick={() => {
                  const items = product.assets;
                  if (couterValue >= 2) return;
                  console.log(
                    "🚀 ~ file: ProductDetails.jsx ~ line 132 ~ ProductDetails ~ couterValue",
                    couterValue
                  );
                  setCouterValue((couterValue) => couterValue + 1);
                  const item = items[couterValue];
                  setImageValue(items[couterValue].url);
                  console.log(
                    "🚀 ~ file: ProductDetails.jsx ~ line 117 ~ ProductDetails ~ item",
                    item.url,
                    couterValue
                  );
                }}
              >
                <ArrowForwardIosOutlined />
              </Button>
              <Grid container direction="row" justifyContent="space-between">
                {product.assets.map((item, i) => (
                  <>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      item
                      xs={2}
                    >
                      <CardActionArea
                        onClick={() => {
                          setImageValue(item.url);
                          setCouterValue(i);
                        }}
                      >
                        <CardMedia
                          className={classes.tinyMedia}
                          image={item.url}
                          title={item.filename}
                        />
                      </CardActionArea>
                    </Grid>
                  </>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                item
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
            </Grid>
          </Grid>
        </Grid>

        {data ? <ReviewedProducts /> : ""}
      </main>
    </>
  );
};

export default ProductDetails;
