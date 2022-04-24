import React, { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  state = {};
  render() {
    const { children } = this.props;
    return (
      <Navbar bg="dark" fixed="top" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            PoshBot
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end" style={{ width: '100%' }}>
              {children}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
