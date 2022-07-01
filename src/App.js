import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { StoreProvider } from "./context/storeContext";

import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

import { commerce } from "./lib/commerce";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };
  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const { cart } = await commerce.cart.update(lineItemId, { quantity });

    setCart(cart);
  };
  const handleRemoveFromCart = async (lineItemId) => {
    const { cart } = await commerce.cart.remove(lineItemId);

    setCart(cart);
  };
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  return (
    <div>
      <StoreProvider
        value={{
          onUpdateCartQty: handleUpdateCartQty,
          onRemoveFromCart: handleRemoveFromCart,
        }}
      >
        <Router>
          <Navbar totalItems={cart.total_items} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Products products={products} onAddToCart={handleAddToCart} />
              }
            />
            <Route
              exact
              path="/cart"
              element={<Cart cart={cart} onEmptyCart={handleEmptyCart} />}
            />
            <Route exact path="/checkout" element={<Checkout cart={cart} />} />
          </Routes>
        </Router>
      </StoreProvider>
    </div>
  );
};

export default App;
