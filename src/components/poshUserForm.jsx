import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { apiCallBegan } from './../store/api';
import { connect } from 'react-redux';

const Joi = require('joi-browser');

class PoshUserForm extends Component {
  state = {
    newPoshUser: {
      quantity: 1,
      password: '',
    },
    generate: true,
    customEmail: false,
    validated: false,
    errors: {},
  };

  schema = {
    quantity: Joi.number().min(1).required().label('Quantity'),
    email: Joi.string().required().label('Email'),
    username: Joi.string().required().max(15).label('Username'),
    password: Joi.string()
      .min(6)
      .regex(/[!@#$%^&*_0-9]/, 'special character or number')
      .label('Password')
      .options({
        language: {
          any: { allowOnly: 'must contain a number or special character' },
        },
      }),
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    form.checkValidity();
    const errors = this.validate();
    const validated = errors ? false : true;

    this.setState({ validated, errors });
    if (validated) {
      const { generate } = this.state;
      let { password, quantity } = this.state.newPoshUser;

      if (generate && quantity) {
        let payload = [];

        for (let i = 0; i < quantity; i++) {
          payload.push({ password });
        }

        this.props.generatePoshUser(payload);
      } else {
        this.props.addPoshUser(this.state.newPoshUser);
      }

      this.props.onHide();
      this.setState({
        newPoshUser: {
          quantity: '',
          password: '',
        },
        generate: true,
        customEmail: false,
        validated: false,
        errors: {},
      });
    }
  };

  validate = () => {
    const { generate, customEmail, newPoshUser } = this.state;
    let schema = { ...this.schema };

    if (generate && customEmail) {
      delete schema.username;
      delete schema.quantity;
    } else if (generate && !customEmail) {
      delete schema.username;
      delete schema.email;
    } else {
      delete schema.quantity;
      delete schema.email;
    }

    const result = Joi.validate(this.state.newPoshUser, schema, {
      abortEarly: false,
    });

    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const newPoshUser = { ...this.state.newPoshUser };

    newPoshUser[input.name] = input.value;

    this.setState({ newPoshUser });
  };

  handleCheckBox = ({ currentTarget: checkbox }) => {
    const newPoshUser = { ...this.state.newPoshUser };
    let checkboxValue = this.state[checkbox.name];
    let state = this.state;
    if (checkboxValue === false) {
      checkboxValue = true;
      if (checkbox.name == 'generate') {
        delete newPoshUser.username;
        delete newPoshUser.email;
        newPoshUser.quantity = 1;
      } else {
        delete newPoshUser.username;
        delete newPoshUser.quantity;
        newPoshUser.email = '';
      }
    } else {
      checkboxValue = false;
      if (checkbox.name == 'generate') {
        delete newPoshUser.quantity;
        delete newPoshUser.email;
        newPoshUser.username = '';
      } else {
        delete newPoshUser.username;
        delete newPoshUser.quantity;
        newPoshUser.quantity = 1;
      }
    }

    state[checkbox.name] = checkboxValue;
    state.newPoshUser = newPoshUser;
    if (checkbox.name == 'generate') {
      state.customEmail = false;
    } else {
      state.generate = true;
    }

    this.setState(state);
  };

  render() {
    const { newPoshUser, errors, generate, customEmail } = this.state;
    console.log(this.state);
    let identifierInvalid = false;
    let identifierErrors = '';
    let identifierType = 'number';
    let identifierName = 'quantity';
    let identifierLabel = 'Quantity';
    let identifierValue = newPoshUser.quantity;

    if (generate && errors.quantity) {
      identifierInvalid = true;
      identifierErrors = errors.quantity;
    } else if (!generate && errors.username) {
      identifierInvalid = true;
      identifierErrors = errors.username;
    } else if (generate && errors.email) {
      identifierInvalid = true;
      identifierErrors = errors.email;
    }

    if (!generate) {
      identifierType = 'text';
      identifierName = 'username';
      identifierLabel = 'Username';
      identifierValue = newPoshUser.username;
    } else if (generate && customEmail) {
      identifierType = 'email';
      identifierName = 'email';
      identifierLabel = 'Email';
      identifierValue = newPoshUser.email;
    }

    return (
      <Form id="poshUserAddForm" onSubmit={this.handleSubmit} validated={false}>
        <Row style={{ justifyContent: 'end' }}>
          <Col xs={4}>
            <Form.Label></Form.Label>
            <Form.Check
              type="switch"
              label="Generate"
              name="generate"
              onChange={this.handleCheckBox}
              checked={generate}
            />
          </Col>
          <Col xs={4}>
            <Form.Label></Form.Label>
            <Form.Check
              type="switch"
              label="Custom Email"
              name="customEmail"
              onChange={this.handleCheckBox}
              checked={customEmail}
            />
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId={identifierName}>
          <Form.Label>{identifierLabel}</Form.Label>
          <Form.Control
            type={identifierType}
            name={identifierName}
            value={identifierValue}
            onChange={this.handleChange}
            isInvalid={identifierInvalid}
            required
            autoFocus
          />
          <Form.Control.Feedback type="invalid">
            {identifierErrors}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            onChange={this.handleChange}
            required
            value={newPoshUser.password}
            isInvalid={errors.password ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addPoshUser: (payload) => {
    dispatch(
      apiCallBegan({
        url: '/posh-users/',
        method: 'POST',
        data: payload,
        onSuccess: 'poshUsers/added',
      })
    );
  },
  generatePoshUser: (payload) => {
    dispatch(
      apiCallBegan({
        url: '/posh-users/generate/',
        method: 'POST',
        data: payload,
        onSuccess: 'poshUsers/added',
      })
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PoshUserForm);
