import React, { Component } from 'react';
import HeadingBar from '../components/common/headingBar';
import AddButton from '../components/common/addButton';
import Grid from '../components/common/grid';
import CustomCard from '../components/common/customCard';
import ListingBody from '../components/listingBody';
import _ from 'lodash';
import { paginate } from '../utils/paginate';
class Listings extends Component {
  state = {
    listings: [],
    search: '',
    pageSize: 12,
    currentPage: 1,
  };

  componentDidMount() {}

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = (id) => {
    const listings = this.state.listings.filter((l) => l.id !== id);
    this.setState({ listings });
  };

  handleSearch = (search) => {
    this.setState({ search, currentPage: 1 });
  };

  render() {
    const { search, pageSize, currentPage, listings: allListings } = this.state;

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
          children={<AddButton message="Add Listing" onClick={null} />}
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
              imgSrc={listing.imgUrl}
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

export default Listings;
