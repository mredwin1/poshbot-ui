import React, { useState } from 'react';
import {
  Navbar,
  Container,
  Nav,
  Modal,
  Form,
  Button,
  NavDropdown,
} from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  console.log(location);
  const { pathname } = location;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Posh User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="addUserForm.Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addUserForm.Password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <NavBar pathname={pathname} />
      <Container style={{ marginTop: 65 }}>
        <Outlet />
      </Container>
    </React.Fragment>
  );
}

export default App;
