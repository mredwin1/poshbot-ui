import React, { Component } from 'react';
import _ from 'lodash';
import { paginate } from '../utils/paginate.js';
import { getPoshUsers } from '../samples.js';
import Grid from '../components/common/grid.jsx';
import HeadingBar from '../components/common/headingBar.jsx';
import CustomCard from '../components/common/customCard.jsx';
import AddButton from '../components/common/addButton.jsx';
import PoshUserBody from '../components/poshUserBody.jsx';
import { Modal, Form, Button } from 'react-bootstrap';

class PoshUsers extends Component {
  state = {
    poshUsers: [],
    search: '',
    pageSize: 12,
    currentPage: 1,
    show: false,
  };

  componentDidMount() {
    this.setState({ poshUsers: getPoshUsers() });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = (poshUserId) => {
    const poshUsers = this.state.poshUsers.filter((u) => u.id !== poshUserId);
    this.setState({ poshUsers });
  };

  handleSearch = (search) => {
    this.setState({ search, currentPage: 1 });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleOpen = () => {
    this.setState({ show: true });
  };

  render() {
    const {
      search,
      pageSize,
      show,
      currentPage,
      poshUsers: allPoshUsers,
    } = this.state;

    const filtered = search
      ? _.filter(
          allPoshUsers,
          (u) =>
            u.email.toLowerCase().includes(search) ||
            u.firstName.toLowerCase().includes(search) ||
            u.lastName.toLowerCase().includes(search)
        )
      : allPoshUsers;
    const poshUsers = paginate(filtered, currentPage, pageSize);
    return (
      <React.Fragment>
        <Modal show={show} onHide={this.handleClose} centered>
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
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <HeadingBar
          searchPlaceholder="Search by Name/Email"
          title={`${filtered.length} Posh Users`}
          onSearch={this.handleSearch}
          children={
            <AddButton message="Add Posh User" onClick={this.handleOpen} />
          }
        />
        <hr className="mt-2" />
        <Grid
          currentPage={currentPage}
          itemsCount={filtered.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          children={poshUsers.map((poshUser) => (
            <CustomCard
              key={poshUser.id}
              imgSrc={poshUser.profilePictureUrl}
              imgUrl={poshUser.profileUrl}
              children={
                <PoshUserBody {...poshUser} onDelete={this.handleDelete} />
              }
            ></CustomCard>
          ))}
        />
      </React.Fragment>
    );
  }
}

export default PoshUsers;
