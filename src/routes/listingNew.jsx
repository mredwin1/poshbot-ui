import React, { Component } from 'react';
import ListingForm from '../components/listingForm';

class ListingNew extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Add Listing</h1>
        <ListingForm />
      </React.Fragment>
    );
  }
}

export default ListingNew;
