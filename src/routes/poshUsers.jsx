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
import { connect } from 'react-redux';
import {
  loadPoshUsers,
  poshUserAdded,
  poshUserRemoved,
} from '../store/poshUsers';

class PoshUsers extends Component {
  state = {
    search: '',
    pageSize: 12,
    currentPage: 1,
    show: false,
  };

  componentDidMount() {
    this.props.loadPoshUsers(getPoshUsers());
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = (id) => {
    this.props.poshUserRemoved({ id });
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
    this.props.poshUserAdded({ email, password });

    this.setState({ currentPage: 1, search: '' });
  };
  render() {
    const { search, pageSize, show, currentPage } = this.state;

    const { poshUsers: allPoshUsers } = this.props;

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

const mapStateToProps = (state) => ({
  poshUsers: state.entities.poshUsers.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadPoshUsers: (payload) => {
    dispatch(loadPoshUsers(payload));
  },
  poshUserAdded: (payload) => {
    dispatch(poshUserAdded(payload));
  },
  poshUserRemoved: (payload) => {
    dispatch(poshUserRemoved(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PoshUsers);
