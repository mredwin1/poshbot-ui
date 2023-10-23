import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { apiCallBegan } from './../store/api';
import { connect } from 'react-redux';
import { withRouter } from '../components/common/withRoute';
import Select from './common/select';
import { Typeahead } from 'react-bootstrap-typeahead';

const Joi = require('joi-browser');

class CampaignForm extends Component {
  state = {
    newCampaign: {
      mode: '',
      auto_run: false,
      generate_users: false,
      title: '',
      delay: '',
      selectedPoshUser: [],
      selectedListings: [],
    },
    validated: false,
    poshUserOptions: [],
    listingOptions: [],
    errors: {},
  };
  schema = {
    mode: Joi.string().max(20).required().label('Mode'),
    auto_run: Joi.boolean().required().label('Auto Run'),
    generate_users: Joi.bool().required().label('Generate Users'),
    title: Joi.string().max(30).required().label('Title'),
    delay: Joi.number().min(5).required().label('Delay'),
    selectedPoshUser: Joi.any().required().label('Posh User'),
    selectedListings: Joi.any().required().label('Description'),
  };
  modeOptionsMapping = {
    'Select a Mode': '',
    'Advanced Sharing': '0',
    'Basic Sharing': '1',
  };
  constructor() {
    super();
    this.navigateToCampaigns = this.navigateToCampaigns.bind(this);
  }

  componentDidMount = async () => {
    const { id } = this.props.params;
    const { poshUsers, listings } = this.props;
    const listingsFiltered = listings.filter(
      (listing) => listing.assigned === false
    );

    const modifiedPoshUsers = poshUsers.map((poshUser) => {
      const label = poshUser.is_registered
        ? poshUser.username
        : `${poshUser.username} *NEW*`;
      return { ...poshUser, label };
    });

    const poshUserOptions = modifiedPoshUsers.filter(
      (poshUser) => poshUser.status === 'Unassigned'
    );

    const listingOptions = listingsFiltered.map((listing) => ({
      ...listing,
      titleSize: `${listing.title} (${listing.size})`,
    }));

    let stateChanges = { poshUserOptions, listingOptions };

    if (id) {
      stateChanges.newCampaign = this.initializeCampaign(id);
    }

    this.setState(stateChanges);
  };

  navigateToCampaigns = () => {
    this.props.navigate('/campaigns');
  };

  initializeCampaign = (id) => {
    let campaign = this.props.campaigns.filter(
      (campaign) => campaign.id === id
    )[0];
    const poshUser = this.props.poshUsers.filter(
      (poshUser) => poshUser.id === campaign.posh_user
    );
    let listings = this.props.listings.filter((listing) =>
      campaign.listings.includes(listing.id)
    );
    listings = listings.map((listing) => ({
      ...listing,
      titleSize: `${listing.title} (${listing.size})`,
    }));
    const newCampaign = {
      mode: Object.keys(this.modeOptionsMapping).find(
        (key) => this.modeOptionsMapping[key] === campaign.mode
      ),
      auto_run: campaign.auto_run,
      generate_users: campaign.generate_users,
      title: campaign.title,
      delay: campaign.delay.toString(),
      selectedPoshUser: poshUser,
      selectedListings: listings,
    };
    return newCampaign;
  };

  transformToFormData = (newListing) => {
    newListing.mode = this.modeOptionsMapping[newListing.mode];
    newListing.listings = [];

    if (typeof newListing.selectedPoshUser[0] !== undefined) {
      newListing.posh_user = newListing.selectedPoshUser[0].id;
    } else {
      newListing.poshUser = '';
    }

    newListing.selectedListings.forEach((listing) => {
      newListing.listings.push(listing.id);
    });

    delete newListing.selectedPoshUser;
    delete newListing.selectedListings;

    const keys = Object.keys(newListing);
    let formData = new FormData();
    keys.forEach((key) => {
      if (key === 'listings') {
        newListing.listings.forEach((listingId) => {
          formData.append(key, listingId);
        });
      } else {
        formData.append(key, newListing[key]);
      }
    });
    return formData;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    form.checkValidity();
    const errors = this.validate();
    const validated = errors ? false : true;

    this.setState({ validated, errors });
    if (validated) {
      const { id } = this.props.params;
      let { newCampaign } = this.state;
      const formData = this.transformToFormData(newCampaign);

      if (id) {
        this.props.campaignUpdated(formData, id);
      } else {
        this.props.campaignAdded(formData);
      }

      this.navigateToCampaigns();
      this.setState({
        newCampaign: {
          mode: '',
          auto_run: false,
          generate_users: false,
          title: '',
          delay: '',
          selectedPoshUser: [],
          selectedListings: [],
        },
        errors: {},
      });
    }
  };

  validate = () => {
    const result = Joi.validate(this.state.newCampaign, this.schema, {
      abortEarly: false,
    });

    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  handleSelect = ({ target: select }) => {
    const { value, name } = select;
    let { newCampaign } = this.state;
    newCampaign[name] = value;

    this.setState({ newCampaign });
  };

  handleChange = ({ currentTarget: input }) => {
    const newCampaign = { ...this.state.newCampaign };

    newCampaign[input.name] = input.value;

    this.setState({ newCampaign });
  };

  handleCheckBox = ({ currentTarget: checkbox }) => {
    const newCampaign = { ...this.state.newCampaign };

    if (newCampaign[checkbox.name] === false) {
      newCampaign[checkbox.name] = true;
    } else {
      newCampaign[checkbox.name] = false;
    }

    this.setState({ newCampaign });
  };

  handlePoshUserSelect = (poshUser) => {
    const newCampaign = { ...this.state.newCampaign };
    newCampaign.selectedPoshUser = poshUser;
    this.setState({ newCampaign });
  };

  handleListingSelect = (listings) => {
    const newCampaign = { ...this.state.newCampaign };
    newCampaign.selectedListings = listings;
    this.setState({ newCampaign });
  };

  render() {
    const { newCampaign, errors, poshUserOptions, listingOptions } = this.state;
    const modeOptions = Object.keys(this.modeOptionsMapping);
    return (
      <Form id="listingForm" onSubmit={this.handleSubmit} validated={false}>
        <Row style={{ justifyContent: 'end' }}>
          <Col xs={2}>
            <Form.Label></Form.Label>
            <Form.Check
              type="switch"
              label="Auto Run"
              name="auto_run"
              onChange={this.handleCheckBox}
              checked={newCampaign.auto_run}
            />
          </Col>
          <Col xs={2}>
            <Form.Label></Form.Label>
            <Form.Check
              type="switch"
              label="Generate Users"
              name="generate_users"
              onChange={this.handleCheckBox}
              checked={newCampaign.generate_users}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              maxLength="50"
              value={newCampaign.title}
              onChange={this.handleChange}
              isInvalid={errors.title ? true : false}
              required
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Form.Label>Posh User</Form.Label>
            <Typeahead
              clearButton
              options={poshUserOptions}
              labelKey="label"
              placeholder="Choose a Posh User..."
              id="posh-user-select"
              onChange={this.handlePoshUserSelect}
              selected={newCampaign.selectedPoshUser}
            />
            <Form.Control.Feedback type="invalid">
              {errors.selectedPoshUser}
            </Form.Control.Feedback>
          </Col>
          <Col xs={4}>
            <Select
              label="Mode"
              name="mode"
              onChange={this.handleSelect}
              errors={errors}
              value={newCampaign.mode}
              options={modeOptions}
            />
          </Col>
          <Col xs={4}>
            <Form.Label>Delay</Form.Label>
            <Form.Control
              type="number"
              name="delay"
              min="5"
              value={newCampaign.delay}
              onChange={this.handleChange}
              isInvalid={errors.delay ? true : false}
              required
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {errors.delay}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Listings</Form.Label>
            <Typeahead
              multiple
              id="listing-select"
              labelKey="titleSize"
              onChange={this.handleListingSelect}
              options={listingOptions}
              placeholder="Choose Listings..."
              selected={newCampaign.selectedListings}
            />
          </Col>
          <Form.Control.Feedback type="invalid">
            {errors.selectedPoshUser}
          </Form.Control.Feedback>
        </Row>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  poshUsers: state.entities.poshUsers.list,
  listings: state.entities.listings.list,
  campaigns: state.entities.campaigns.list,
});

const mapDispatchToProps = (dispatch) => ({
  campaignAdded: (payload) => {
    dispatch(
      apiCallBegan({
        url: '/campaigns/',
        method: 'POST',
        data: payload,
        onSuccess: 'campaigns/added',
      })
    );
  },
  campaignUpdated: (payload, id) => {
    dispatch(
      apiCallBegan({
        url: `/campaigns/${id}/`,
        method: 'PUT',
        data: payload,
        onSuccess: 'campaigns/updated',
      })
    );
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CampaignForm)
);
