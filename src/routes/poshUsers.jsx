import React, { Component } from 'react';
import { getPoshUsers } from '../samples.js';
import Grid from '../components/common/grid.jsx';
import HeadingBar from '../components/common/headingBar.jsx';
import CustomCard from '../components/common/customCard.jsx';
import AddButton from '../components/common/addButton.jsx';
import { paginate } from '../utils/paginate.js';
import _ from 'lodash';
import PoshUserBody from '../components/poshUserBody.jsx';

class PoshUsers extends Component {
  state = {
    poshUsers: [],
    search: '',
    pageSize: 12,
    currentPage: 1,
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

  render() {
    const {
      search,
      pageSize,
      currentPage,
      poshUsers: allPoshUsers,
    } = this.state;
    const { onShow } = this.props;

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
        <HeadingBar
          searchPlaceholder="Search by Name/Email"
          title={`${filtered.length} Posh Users`}
          children={<AddButton message="Add Posh User" />}
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
