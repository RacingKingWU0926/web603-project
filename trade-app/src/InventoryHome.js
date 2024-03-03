import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

import InventoryNavBar from "./NavInventory";
import "bootstrap/dist/css/bootstrap.min.css";

class InventoryHome extends Component {
  render() {
    return (
      <div>
        <InventoryNavBar />
        <Container fluid>
          <Button className="m-5 nav bg-light">
            <Link to="/inventories/" className="nav-link">Manage My Inventory</Link>
          </Button>
        </Container>
      </div>
    );
  }
}

export default InventoryHome;
