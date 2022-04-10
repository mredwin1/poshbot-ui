import React, { Component } from 'react';
import _ from 'lodash';
import { paginate } from '../utils/paginate.js';
import { getPoshUsers } from '../samples.js';
import Grid from '../components/common/grid.jsx';
import HeadingBar from '../components/common/headingBar.jsx';
import CustomCard from '../components/common/customCard.jsx';
import AddButton from '../components/common/addButton.jsx';
import PoshUserBody from '../components/poshUserBody.jsx';
import PoshUserForm from '../components/poshUserForm.jsx';
import { Modal, Button } from 'react-bootstrap';

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

  handleDelete = (id) => {
    const poshUsers = this.state.poshUsers.filter((u) => u.id !== id);
    this.setState({ poshUsers });
  };

  handleSearch = (search) => {
    this.setState({ search, currentPage: 1 });
  };

  handleOpen = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleAddPoshUser = (email, password) => {
    const newPoshUser = {
      id: '5434d901-df7e-4bab-874b-142507b5d201',
      userId: '9696799f-74e3-4296-b6a4-2236ff35ffce',
      firstName: 'New',
      lastName: 'User',
      email: email,
      username: 'new_user',
      password: password,
      profilePictureUrl:
        'https://images.unsplash.com/photo-1590076263644-1ab672cf1dea?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8ZmVtYWxlfHx8fHx8MTY0ODkzMDM0MQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=600',
      sales: 2,
      profileUrl: 'https://poshmark.com/closet/monica_schmi',
      campaignStatus: 'Not Assigned',
    };
    const poshUsers = [...this.state.poshUsers];
    poshUsers.unshift(newPoshUser);

    this.setState({ poshUsers, currentPage: 1, search: '' });
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
            <PoshUserForm
              onHide={this.handleClose}
              onAddPoshUser={this.handleAddPoshUser}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              value="Submit"
              form="poshUserAddForm"
            >
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
