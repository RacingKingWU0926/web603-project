import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ products }) => {
  return (
    <>
      {/* Products in Cart */}
      <div className="container">
        <h1 className="page-title">Your Cart Items</h1>
        {products.length > 0 ? (
          <>
            {/* List Products in Carts */}
            {products.map((product) => (
              <div
                key={product.id}
                className="row align-items-center my-2 mx-2"
              >
                <div className="col">
                  <p className="product-name">{product.name}</p>
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="col quantity-container">
                  <span className="cart-quantity">
                    Quantity: {product.quantity}{" "}
                  </span>
                </div>
              </div>
            ))}

            {/* Check Out button */}
            <Link to="/signin">
              <button className="btn btn-primary my-3 mx-5">Check Out</button>
            </Link>
          </>
        ) : (
          <>
            <p>Your cart is empty.</p>
            <Link to="/">
              <button className="btn btn-success">Continue Shopping</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
