import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './common/navBar';
import { Nav } from 'react-bootstrap';

class PublicNavBar extends Component {
  render() {
    const { pathname } = this.props;
    return (
      <NavBar
        children={
          <React.Fragment>
            <Nav.Link
              as={Link}
              to="/login"
              active={pathname === '/login' ? true : false}
            >
              Login
            </Nav.Link>
          </React.Fragment>
        }
      />
    );
  }
}

export default PublicNavBar;
