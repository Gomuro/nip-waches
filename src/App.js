import React, { useState, useEffect } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar, Products, Cart, Checkout, ProductDetails } from "./components";
import { commerce } from "./lib/commerce";
import { StoreProvider } from "./context/storeContext";
import About from "./components/About/About";

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  console.log(
    "🚀 ~ file: App.js ~ line 14 ~ App ~ sortedProducts",
    sortedProducts
  );
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data: products } = await commerce.products.list();
    const { data: categoriesData } = await commerce.categories.list();
    const productsPerCategory = categoriesData.reduce((acc, category) => {
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
    setSortedProducts(productsPerCategory);
    setCategoriesData(categoriesData);
    setProducts(products);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();

    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const theme = createTheme({
    palette: {
      background: {
        default: "#E7F6F2",
      },
      primary: {
        main: "#06283D",
      },
      secondary: {
        main: "#47B5FF",
      },
      text: {
        secondary: "#06283D",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <StoreProvider
        value={{ products: products, categoriesData: categoriesData }}
      >
        <Router>
          <div style={{ display: "flex" }}>
            <CssBaseline />
            <Navbar
              totalItems={cart.total_items}
              handleDrawerToggle={handleDrawerToggle}
            />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Products
                    products={products}
                    onAddToCart={handleAddToCart}
                    handleUpdateCartQty
                  />
                }
              />

              <Route
                exact
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    onUpdateCartQty={handleUpdateCartQty}
                    onRemoveFromCart={handleRemoveFromCart}
                    onEmptyCart={handleEmptyCart}
                  />
                }
              />

              <Route
                path="/checkout"
                exact
                element={
                  <Checkout
                    cart={cart}
                    order={order}
                    onCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage}
                  />
                }
              />
              <Route path="/about" exact element={<About />} />
              <Route
                path="/products/:id"
                element={<ProductDetails onAddToCart={handleAddToCart} />}
              />
            </Routes>
          </div>
        </Router>
      </StoreProvider>
    </ThemeProvider>
  );
};

export default App;
