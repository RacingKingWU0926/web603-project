import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ itemCount }) => {
  return (
    <div className="navbar nav-bg d-flex justify-content-between p-3">
      <h1>Marketplace for Collectibles!</h1>
      <Link to="/checkout" className="nav-link">
        <FontAwesomeIcon icon={faShoppingCart} className="fa-shopping-cart" />{" "}
        {itemCount} items
      </Link>
    </div>
  );
};

export default Nav;
