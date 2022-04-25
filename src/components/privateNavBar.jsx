import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './common/navBar';
import { Nav } from 'react-bootstrap';

class PrivateNavBar extends Component {
  render() {
    const { pathname } = this.props;
    return (
      <NavBar
        children={
          <React.Fragment>
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
              active={pathname.includes('/listings') ? true : false}
            >
              Listings
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/campaigns"
              active={pathname.includes('/campaigns') ? true : false}
            >
              Campaigns
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/logout"
              active={pathname === '/logout' ? true : false}
            >
              Logout
            </Nav.Link>
          </React.Fragment>
        }
      />
    );
  }
}

export default PrivateNavBar;
