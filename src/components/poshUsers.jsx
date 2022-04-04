import React, { Component } from 'react';
import { getPoshUsers } from '../samples.js';
import PoshUser from './poshUser.jsx';
import { Col, Row } from 'react-bootstrap';

class PoshUsers extends Component {
  state = {
    poshUsers: [],
    search: '',
  };

  componentDidMount() {
    this.setState({ poshUsers: getPoshUsers() });
  }

  handleImgClick = (url) => {
    window.open(url);
  };

  handleDelete = (poshUserId) => {
    const poshUsers = this.state.poshUsers.filter((u) => u.id !== poshUserId);
    this.setState({ poshUsers });
  };

  handleSearch = (search) => {
    const poshUsers = getPoshUsers().filter(
      (u) =>
        u.email.toLowerCase().includes(search) ||
        u.firstName.toLowerCase().includes(search) ||
        u.lastName.toLowerCase().includes(search)
    );
    this.setState({ search, poshUsers });
  };

  render() {
    const { poshUsers, search } = this.state;
    return (
      <React.Fragment>
        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Col xs={12} md={7} lg={8}>
            <h1>{poshUsers.length} Posh Users</h1>
          </Col>
          <Col xs={12} md={5} lg={4}>
            <InputGroup>
              <InputGroup.Text id="search-icon">
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <FormControl
              className="form-control"
              type="text"
              placeholder="Search by Username/Name/Email"
              name="search"
              onChange={(event) => this.handleSearch(event.target.value)}
              value={search}
            ></input>
          </Col>
        </Row>
        <hr className="mt-2" />
        <Row xs={12} md={2} lg={3} xl={4}>
          {poshUsers.map((poshUser) => (
            <PoshUser
              key={poshUser.id}
              {...poshUser}
              onDelete={this.handleDelete}
              onImgClick={this.handleImgClick}
            ></PoshUser>
          ))}
        </Row>
      </React.Fragment>
    );
  }
}

export default PoshUsers;
