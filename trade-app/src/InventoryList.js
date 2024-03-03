import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Container, Table } from "reactstrap";

import InventoryNavBar from "./NavInventory";
import "bootstrap/dist/css/bootstrap.min.css";

function InventoryList() {
  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/inventories/`)
      .then(response => response.json())
      .then(data => {
        setInventories(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log("Error reading data:" + err);
        setIsLoading(false);
      });
  }, []);

  const removeInv = async (id) => {
    await fetch(`/api/inventories/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    console.log("Remove Done!");
    const updatedInventories = inventories.filter(i => i._id !== id);
    setInventories(updatedInventories);
  };

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  const inventoryList = inventories.map(inventory => (
    <tr key={inventory._id}>
      <td style={{ whiteSpace: 'nowrap' }}>{inventory.carBrand}</td>
      <td style={{ whiteSpace: 'nowrap' }}>{inventory.carModel}</td>
      <td>{inventory.stageSix}</td>
      <td>{inventory.fusionParts}</td>
      <td>{inventory.carValue}</td>
      <td>{inventory.askPrice}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={`/inventories/${inventory._id}`}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => removeInv(inventory._id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  ));

  return (
    <div>
      <InventoryNavBar />
      <Container fluid>
        <div className="float-right">
          <Button color="success" className="my-4" tag={Link} to={`/inventories/new`}>Add Inventory</Button>
        </div>
        <h3>Inventory List</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th width="16%">Car Brand</th>
              <th width="20%">Car Model</th>
              <th width="16%">Stage 6 Equipped</th>
              <th width="16%">Fusion Parts Equipped</th>
              <th width="16%">Car Value</th>
              <th width="16%">Ask Price</th>
            </tr>
          </thead>
          <tbody>
            {inventoryList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default InventoryList;
