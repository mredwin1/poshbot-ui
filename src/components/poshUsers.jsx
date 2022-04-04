import React, { Component } from 'react';
import { getPoshUsers } from '../samples.js';
import PoshUser from './poshUser.jsx';
import {
  Col,
  Row,
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

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
    const { onShow } = this.props;
    return (
      <React.Fragment>
        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Col xs={9} md={6} lg={7}>
            <h1>{poshUsers.length} Posh Users</h1>
          </Col>
          <Col xs={3} md={1} className="text-end" onClick={onShow}>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Add PoshUser</Tooltip>}
            >
              <i
                className="bi bi-plus-square"
                style={{ cursor: 'pointer', fontSize: '2rem' }}
              ></i>
            </OverlayTrigger>
          </Col>
          <Col xs={12} md={5} lg={4}>
            <InputGroup>
              <InputGroup.Text id="search-icon">
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <FormControl
                className="form-control"
                type="text"
                placeholder="Search by Name/Email"
                name="search"
                onChange={(event) => this.handleSearch(event.target.value)}
                value={search}
                aria-label="search"
                aria-describedby="search-icon"
              />
            </InputGroup>
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
