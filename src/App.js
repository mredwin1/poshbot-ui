import React from 'react';
import PoshUsers from './components/poshUsers.jsx';
import { Navbar, Container, Nav } from 'react-bootstrap';

function App() {
  return (
    <React.Fragment>
      <Navbar bg="dark" fixed="top" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">PoshBot</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#poshusers">PoshUsers</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ marginTop: 65 }}>
        <PoshUsers></PoshUsers>
      </Container>
    </React.Fragment>
  );
}

export default App;
