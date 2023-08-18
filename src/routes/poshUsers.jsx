import React, { Component } from 'react';
import _ from 'lodash';
import { paginate } from '../utils/paginate.js';
import Grid from '../components/common/grid.jsx';
import HeadingBar from '../components/common/headingBar.jsx';
import CustomCard from '../components/common/customCard.jsx';
import AddButton from '../components/common/addButton.jsx';
import PoshUserBody from '../components/poshUserBody.jsx';
import PoshUserForm from '../components/poshUserForm.jsx';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { apiCallBegan } from '../store/api.js';

class PoshUsers extends Component {
  state = {
    search: '',
    pageSize: 12,
    currentPage: 1,
    show: false,
    statusFilter: '',
  };

  componentDidMount() {
    this.props.loadPoshUsers();
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = (id) => {
    this.props.removePoshUser({ id });
  };

  handleDisable = (id) => {
    this.props.disablePoshUser({ id });
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
    this.props.addPoshUser({ email, password });
    this.setState({ currentPage: 1, search: '' });
  };

  render() {
    const { search, pageSize, show, currentPage, statusFilter } = this.state;

    const { poshUsers: allPoshUsers, poshUserAdded } = this.props;
    const filterOptions = {
      '': '',
      active: 'ACTIVE',
      inactive: 'INACTIVE',
      sold: 'SOLD',
    };
    // Test
    const filtered = search
      ? _.statusFilter(
          allPoshUsers,
          (u) =>
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.username.toLowerCase().includes(search.toLowerCase())
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
              poshUserAdded={poshUserAdded}
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
          searchPlaceholder="Search by Username/Email"
          title={`${filtered.length} Posh Users`}
          onSearch={this.handleSearch}
          onFilter={this.handleFilter}
          filterOptions={filterOptions}
          statusFilter={statusFilter}
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
              ribbonText={
                Math.abs(new Date() - new Date(poshUser.last_sale_time)) /
                  (1000 * 60 * 60 * 24) <
                7
                  ? 'Recent Sale'
                  : null
              }
              imgSrc={
                poshUser.profile_picture
                  ? poshUser.profile_picture
                  : `${process.env.PUBLIC_URL}/user.png`
              }
              imgUrl={poshUser.profile_url}
              children={
                <PoshUserBody {...poshUser} onDisable={this.handleDisable} />
              }
            ></CustomCard>
          ))}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  poshUsers: state.entities.poshUsers.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadPoshUsers: (payload) => {
    dispatch(
      apiCallBegan({
        url: '/posh-users/',
        onSuccess: 'poshUsers/received',
      })
    );
  },
  removePoshUser: (payload) => {
    dispatch(
      apiCallBegan({
        url: `/posh-users/${payload.id}/`,
        method: 'DELETE',
        onSuccess: 'poshUsers/removed',
      })
    );
  },
  disablePoshUser: (payload) => {
    dispatch(
      apiCallBegan({
        url: `/posh-users/${payload.id}/disable/`,
        method: 'POST',
        onSuccess: 'poshUsers/disabled',
      })
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PoshUsers);
