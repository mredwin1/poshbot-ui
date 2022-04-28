import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { apiCallBegan } from './../store/api';
import { connect } from 'react-redux';
import { withRouter } from '../components/common/withRoute';
import Autocomplete from './common/autocomplete';
import axios from 'axios';
import Select from './common/select';

const Joi = require('joi-browser');

class CampaignForm extends Component {
  state = {
    newCampaign: {
      mode: '',
      autorun: false,
      generate_users: false,
      title: '',
      delay: '',
      posh_user: '',
      listing: '',
      listings: [],
    },
    validated: false,
    isLoadingPoshUsers: false,
    poshUserOptions: [],
    isLoadingListings: false,
    listingOptions: [],
    errors: {},
  };
  schema = {
    mode: Joi.string().max(20).required().label('Mode'),
    autorun: Joi.boolean().required().label('Auto Run'),
    generate_users: Joi.bool().required().label('Generate Users'),
    title: Joi.string().max(30).required().label('Title'),
    delay: Joi.number().min(5).required().label('Delay'),
    listing_price: Joi.number().min(25).required().label('Listing Price'),
    posh_user: Joi.any().label('Posh User'),
    listings: Joi.any().label('Description'),
  };
  modeOptionsMapping = {
    'Advanced Sharing': 0,
  };
  constructor() {
    super();
    this.navigateToCampaigns = this.navigateToCampaigns.bind(this);
  }

  navigateToCampaigns = () => {
    this.props.navigate('/campaigns');
  };

  handleSelect = ({ target: select }) => {
    const { value, name } = select;
    let { newCampaign } = this.state;
    newCampaign[name] = value;

    this.setState({ newCampaign });
  };

  handleSearch = async (query, endpoint) => {
    const { user } = this.props;
    const baseURL =
      process.env.NODE_ENV === 'production'
        ? 'https://api.poshbot.net'
        : 'http://localhost:8000';
    try {
      const response = await axios.get(
        `${baseURL}${endpoint}?search=${query}&limit=5&offset=0&unassigned=true`,
        { headers: { Authorization: `JWT ${user.accessToken}` } }
      );
      const options = response.data.results;
      return options;
    } catch (error) {
      console.log(error.response);
    }
  };

  handlePoshUserSearch = async (query) => {
    this.setState({ isLoadingPoshUsers: true });
    const poshUserOptions = await this.handleSearch(query, '/posh-users/');
    this.setState({ isLoadingPoshUsers: false, poshUserOptions });
  };

  handleListingSearch = async (query) => {
    this.setState({ isLoadingListings: true });
    const listingOptions = await this.handleSearch(query, '/listings/');
    this.setState({ isLoadingListings: false, listingOptions });
  };

  transformToFormData(newCampaign) {
    console.log(newCampaign);
    // newCampaign.category = `${newCampaign.category} ${newCampaign.secondaryCategory}`;
    // delete newCampaign.cover_photo_value;
    // delete newCampaign.other_photos_value;
    // delete newCampaign.secondaryCategory;
    // const keys = Object.keys(newCampaign);
    let formData = new FormData();
    // keys.forEach((key) => {
    //   if (key === 'cover_photo') {
    //     formData.append(key, newCampaign.cover_photo[0]);
    //   } else if (key === 'other_photos') {
    //     for (let i = 0; i < newCampaign.other_photos.length; i++) {
    //       formData.append(`other_image_${i}`, newCampaign.other_photos[i]);
    //     }
    //   } else {
    //     formData.append(key, newCampaign[key]);
    //   }
    // });

    return formData;
  }

  handleAddListing = () => {
    const { newCampaign } = this.state;
    newCampaign.listings.push(
      this.props.listings.filter(
        (listing) => listing.id === newCampaign.listing
      )[0]
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    form.checkValidity();
    const errors = this.validate();
    const validated = errors ? false : true;

    this.setState({ validated, errors });
    if (validated) {
      let { newCampaign: newListing } = this.state;
      const formData = this.transformToFormData(newListing);
      console.log(formData);
      //   this.props.listingAdded(formData);
      //   this.navigateToCampaigns();
      this.setState({
        newCampaign: {
          mode: '',
          autorun: false,
          generate_users: false,
          title: '',
          delay: '',
          posh_user: '',
          listings: [],
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

  handleItemSelect = (event, item, name) => {
    const newCampaign = { ...this.state.newCampaign };
    newCampaign[name] = item.id;
    this.setState({ newCampaign });
  };

  render() {
    const {
      newCampaign,
      errors,
      isLoadingPoshUsers,
      poshUserOptions,
      listingOptions,
      isLoadingListings,
    } = this.state;
    const modeOptions = Object.keys(this.modeOptionsMapping);
    return (
      <Form id="listingForm" onSubmit={this.handleSubmit} validated={false}>
        <Row style={{ justifyContent: 'end' }}>
          <Col xs={2}>
            <Form.Label></Form.Label>
            <Form.Check
              type="switch"
              label="Auto Run"
              name="autorun"
              onClick={this.handleCheckBox}
            />
          </Col>
          <Col xs={2}>
            <Form.Label></Form.Label>
            <Form.Check
              type="switch"
              label="Generate Users"
              name="generate_users"
              onClick={this.handleCheckBox}
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
            <Autocomplete
              onSearch={this.handlePoshUserSearch}
              onItemSelect={this.handleItemSelect}
              isLoading={isLoadingPoshUsers}
              options={poshUserOptions}
              placeholder="Search for a Posh User..."
              id="posh-user-autocomplete"
              name="posh_user"
              displayField="username"
              imgField="profile_picture"
            ></Autocomplete>
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
            <Autocomplete
              onSearch={this.handleListingSearch}
              onItemSelect={this.handleItemSelect}
              isLoading={isLoadingListings}
              options={listingOptions}
              placeholder="Search for a Listing..."
              id="listing-auto-complete"
              name="listing"
              displayField="title"
              imgField="cover_photo"
            ></Autocomplete>
          </Col>
          <Col>
            <Button
              variant="primary"
              type="button"
              onClick={this.handleAddListing}
            >
              Add Listing
            </Button>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  listings: state.entities.listings.list,
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
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CampaignForm)
);
