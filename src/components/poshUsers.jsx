import React, { Component } from 'react';
import { getPoshUsers } from '../samples.js';
import PoshUser from './poshUser.jsx';

class PoshUsers extends Component {
  state = {
    poshUsers: [],
    search: '',
  };

  componentDidMount() {
    this.setState({ poshUsers: getPoshUsers() });
  }

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
        <div className="row align-items-center justify-content-between">
          <div className="col-3">
            <h1>{poshUsers.length} Posh Users</h1>
          </div>
          <div className="col-3">
            <input
              className="form-control col-6 mr-2 ml-2"
              type="text"
              placeholder="Search by Username/Name"
              name="search"
              onChange={(event) => this.handleSearch(event.target.value)}
              value={search}
            ></input>
          </div>
        </div>
        <hr className="mt-2" />
        <div className="row">
          {poshUsers.map((poshUser) => (
            <PoshUser
              key={poshUser.id}
              {...poshUser}
              onDelete={this.handleDelete}
            ></PoshUser>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default PoshUsers;
