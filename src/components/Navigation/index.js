import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Navigation = (props) => {
  return(
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">509CTLV</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Button variant="outline-success" onClick={props.handleCartOpen}>Cart</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;