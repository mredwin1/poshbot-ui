import React, { Component } from 'react';
import ListingForm from '../components/listingForm';

class ListingAdd extends Component {
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

export default ListingAdd;
