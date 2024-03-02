import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { products } from "./Products";
import Cart from "./Cart";
import DisplayProducts from "./DisplayProducts";
import Nav from "./Nav";
import SignIn from "./SignIn";

const maxPurchase = 20;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: products,
    };
  }

  handleQuantityChange = (productId, quantity) => {
    const newQuantity = Math.min(Math.max(quantity, 0), maxPurchase);

    this.setState((prevState) => ({
      products: prevState.products.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: newQuantity };
        }
        return product;
      }),
    }));
  };

  calculateTotalItems = () => {
    return this.state.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  };

  render() {
    const { products } = this.state;

    return (
      <Router>
        <div className="shop_cart">
          <Nav itemCount={this.calculateTotalItems()} />
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <DisplayProducts
                  products={products}
                  onQuantityChange={this.handleQuantityChange}
                />
              }
            />
            {/* Checkout Page */}
            <Route
              path="/checkout"
              element={
                <Cart
                  products={products.filter((product) => product.quantity > 0)}
                />
              }
            />
            {/* Sign In Page */}
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
