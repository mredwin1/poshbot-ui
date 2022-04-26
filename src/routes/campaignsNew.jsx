import React, { Component } from 'react';
import CampaignForm from '../components/campaignForm';

class CampaignNew extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Add Campaign</h1>
        <CampaignForm />
      </React.Fragment>
    );
  }
}

export default CampaignNew;
