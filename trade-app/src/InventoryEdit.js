import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

import InventoryNavBar from "./NavInventory";
import "bootstrap/dist/css/bootstrap.min.css";

function InventoryEdit() {
  const [item, setItem] = useState({
    carBrand: "",
    carModel: "",
    stageSix: 0,
    fusionParts: 0,
    carValue: 0,
    askPrice: '0.00',
    ownerId: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInventory() {
      if (params.id !== 'new') {
        try {
          let response = await fetch(`/api/inventories/${params.id}`);
          const inventory = await response.json();
          setItem(inventory);
        } catch (error) {
          console.error('Fetch failed', error);
        }
      }
    }

    fetchInventory();
  }, [params.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const method = item._id ? 'PUT' : 'POST';
    const endpoint = item._id ? `/api/inventories/${item._id}` : `/api/inventories/new`;

    try {
      await fetch(endpoint, {
        method: method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      });
      navigate('/inventories');
    } catch (error) {
      console.error('Submit failed', error);
    }
  };

  const title = <h2 className="mt-3">{params.id !== 'new' ? 'Edit Inventory' : 'Add Inventory'}</h2>;

  return (
    <div>
      <InventoryNavBar />
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="carBrand" className="h5 mt-3">Car Brand</Label>
            <Input
              type="text"
              name="carBrand"
              id="carBrand"
              value={item.carBrand || ""}
              onChange={handleChange}
              autoComplete="carBrand"
            />
          </FormGroup>
          <FormGroup>
            <Label for="carModel" className="h5 mt-3">Car Model</Label>
            <Input
              type="text"
              name="carModel"
              id="carModel"
              value={item.carModel || ""}
              onChange={handleChange}
              autoComplete="carModel" 
            />
          </FormGroup>
          <FormGroup>
            <Label for="stageSix" className="h5 mt-3">Stage 6 Equipped</Label>
            <Input
              type="select"
              name="stageSix"
              id="stageSix"
              value={item.stageSix || 0}
              onChange={handleChange}
            >
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="fusionParts" className="h5 mt-3">Fusion Parts</Label>
            <Input
              type="number"
              name="fusionParts"
              id="fusionParts"
              value={item.fusionParts || 0}
              min="0"
              max="150"
              onChange={handleChange}
              autoComplete="fusionParts" 
            />
          </FormGroup>
          <FormGroup>
            <Label for="carValue" className="h5 mt-3">Car Value</Label>
            <Input
              type="number"
              name="carValue"
              id="carValue"
              value={item.carValue || 0}
              min="0"
              max="5000000"
              onChange={handleChange}
              autoComplete="carValue" 
            />
          </FormGroup>
          <FormGroup>
            <Label for="askPrice" className="h5 mt-3">Ask Price</Label>
            <Input
              type="text"
              name="askPrice"
              id="askPrice"
              value={item.askPrice || "0.00"}
              onChange={handleChange}
              autoComplete="askPrice"
            />
          </FormGroup>
          <FormGroup>
            <Label for="ownerId" className="h5 mt-3">Your User ID</Label>
            <Input
              type="text"
              name="ownerId"
              id="ownerId"
              value={item.ownerId || ""}
              onChange={handleChange}
              autoComplete="ownerId"
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit" className="mt-3">Save</Button>{" "}
            <Button color="secondary" className="mt-3" tag={Link} to="/inventories/">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
}

export default InventoryEdit;
