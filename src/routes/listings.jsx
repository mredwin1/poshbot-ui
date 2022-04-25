import React, { Component } from 'react';
import HeadingBar from '../components/common/headingBar';
import AddButton from '../components/common/addButton';
import Grid from '../components/common/grid';
import CustomCard from '../components/common/customCard';
import ListingBody from '../components/listingBody';
import _ from 'lodash';
import { paginate } from '../utils/paginate';
import { withRouter } from '../components/common/withRoute';
import { apiCallBegan } from './../store/api';
import { connect } from 'react-redux';

class Listings extends Component {
  state = {
    search: '',
    pageSize: 12,
    currentPage: 1,
  };

  constructor() {
    super();
    this.handleAddListing = this.handleAddListing.bind(this);
  }

  componentDidMount() {
    this.props.loadListings();
  }

  handleAddListing = () => {
    this.props.navigate('/listings/new');
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = (id) => {
    this.props.removeListing({ id });
  };

  handleSearch = (search) => {
    this.setState({ search, currentPage: 1 });
  };

  render() {
    const { search, pageSize, currentPage } = this.state;
    const { listings: allListings } = this.props;
    const filtered = search
      ? _.filter(allListings, (u) => u.title.toLowerCase().includes(search))
      : allListings;
    const listings = paginate(filtered, currentPage, pageSize);
    return (
      <React.Fragment>
        <HeadingBar
          searchPlaceholder="Search by Title"
          title={`${filtered.length} Listings`}
          onSearch={this.handleSearch}
          children={
            <AddButton message="Add Listing" onClick={this.handleAddListing} />
          }
        />
        <hr className="mt-2" />
        <Grid
          currentPage={currentPage}
          itemsCount={filtered.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          children={listings.map((listing) => (
            <CustomCard
              key={listing.id}
              imgSrc={listing.cover_photo}
              children={
                <ListingBody {...listing} onDelete={this.handleDelete} />
              }
            ></CustomCard>
          ))}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ listings: state.entities.listings.list });

const mapDispatchToProps = (dispatch) => ({
  loadListings: (payload) => {
    dispatch(
      apiCallBegan({
        url: '/listings/',
        onSuccess: 'listings/received',
      })
    );
  },
  removeListing: (payload) => {
    dispatch(
      apiCallBegan({
        url: `/listings/${payload.id}/`,
        method: 'DELETE',
        onSuccess: 'listings/removed',
      })
    );
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Listings)
);
