import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const DisplayProducts = ({ products, onQuantityChange }) => {
  // Initialize with null since no product is selected initially
  const [activeProductId, setActiveProductId] = useState(null);

  const handleShow = (productId) => setActiveProductId(productId);
  const handleClose = () => setActiveProductId(null);

  const incrementQuantity = (productId) => {
    onQuantityChange(
      productId,
      products.find((p) => p.id === productId).quantity + 1
    );
  };

  const decrementQuantity = (productId) => {
    onQuantityChange(
      productId,
      products.find((p) => p.id === productId).quantity - 1
    );
  };

  return (
    <div className="container">
      <h1 className="page-title">Our Top Picks</h1>
      {products.map((product) => (
        <div key={product.id} className="row align-items-center my-2 mx-2">
          {/* product display */}
          <div className="col">
            <p className="product-name">{product.name}</p>
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
              onClick={() => handleShow(product.id)}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* quantity update */}
          <div className="col quantity-container">
            <div className="row">
              <div className="col-12 text-right">
                <div className="quantity-label">Quantity</div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  className="btn btn-secondary mx-1 quantity-change"
                  onClick={() => incrementQuantity(product.id)}
                />
              </div>
              <div className="col-4 text-left">
                <FontAwesomeIcon
                  icon={faMinusCircle}
                  className="btn btn-secondary mx-1 quantity-change"
                  onClick={() => decrementQuantity(product.id)}
                />
              </div>
              <div className="col-4 text-center">
                <span className="quantity-display"> {product.quantity} </span>
              </div>
            </div>
          </div>

          {/* modal */}
          {activeProductId === product.id && (
            <Modal show={activeProductId !== null} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={product.image}
                  width="350"
                  alt={product.name}
                  className="mx-auto d-block"
                />
                <p>Rating: {product.rating}</p>
              </Modal.Body>
            </Modal>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayProducts;
