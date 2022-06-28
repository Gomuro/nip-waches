import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";

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
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };
  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  return (
    <div>
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
          <Route exact path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
