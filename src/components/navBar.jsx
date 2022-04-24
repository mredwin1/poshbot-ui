import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  const { pathname } = props;
  return (
    <Navbar bg="dark" fixed="top" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          PoshBot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: '100%' }}>
            <Nav.Link
              as={Link}
              to="/posh-users"
              active={pathname === '/posh-users' ? true : false}
            >
              Posh Users
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/listings"
              active={pathname === '/listings' ? true : false}
            >
              Listings
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/campaigns"
              active={pathname === '/campaigns' ? true : false}
            >
              Campaigns
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/login"
              active={pathname === '/login' ? true : false}
            >
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
