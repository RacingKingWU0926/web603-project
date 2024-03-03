import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ itemCount }) => {
  return (
    <div className="navbar nav-bg d-flex p-3">
      <Link to="/">
        <h1>CSR2 Marketplace for Collectibles!</h1>
      </Link>
      <div className="d-flex">
        <Link to="/signin" className="nav-link">
          <button className="btn my-3 mx-5">Sign In</button>
        </Link>
        <Link to="/checkout" className="nav-link my-4">
          <FontAwesomeIcon icon={faShoppingCart} className="fa-shopping-cart" />{" "}
          {itemCount} items
        </Link>
      </div>
    </div>
  );
};

export default Nav;
