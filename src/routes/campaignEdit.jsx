import React, { Component } from 'react';
import CampaignForm from '../components/campaignForm';

class EditCampaign extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Edit Campaign</h1>
        <CampaignForm />
      </React.Fragment>
    );
  }
}

export default EditCampaign;
