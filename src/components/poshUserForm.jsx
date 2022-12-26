import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { apiCallBegan } from './../store/api';
import { connect } from 'react-redux';

const Joi = require('joi-browser');

class PoshUserForm extends Component {
  state = {
    newPoshUser: {
      email: '',
      username: '',
      password: '',
    },
    generate: true,
    validated: false,
    errors: {},
  };

  schema = {
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
      // let { email, password, quantity } = this.state.newPoshUser;
      // let payload = [];
      // let indexOfAt = -1;
      // let indexOfPlus = -1;
      // if (email.indexOf('+') === -1) {
      //   indexOfAt = email.indexOf('@');
      //   email = `${email.substring(0, indexOfAt)}+1${email.substring(
      //     indexOfAt,
      //     email.length
      //   )}`;
      // }

      // for (let i = 0; i < quantity; i++) {
      //   payload.push({ email, password });
      //   indexOfAt = email.indexOf('@');
      //   indexOfPlus = email.indexOf('+');
      //   let emailNumber =
      //     parseInt(email.substring(indexOfPlus + 1, indexOfAt)) + 1;
      //   email = `${email.substring(
      //     0,
      //     indexOfPlus + 1
      //   )}${emailNumber}${email.substring(indexOfAt, email.length)}`;
      // }
      let payload = { ...this.state.newPoshUser };
      const { generate } = this.state;
      if (generate) {
        this.props.generatePoshUser(payload);
      } else {
        this.props.addPoshUser(payload);
      }

      this.props.onHide();
      this.setState({
        newPoshUser: {
          email: '',
          username: '',
          password: '',
        },
        generate: true,
        validated: false,
        errors: {},
      });
    }
  };

  validate = () => {
    const { generate } = this.state;
    let schema = { ...this.schema };

    if (generate) {
      delete schema.username;
    } else {
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

    if (checkboxValue === false) {
      checkboxValue = true;
      delete newPoshUser.username;
      newPoshUser.email = '';
    } else {
      checkboxValue = false;
      delete newPoshUser.email;
      newPoshUser.username = '';
    }

    let state = { newPoshUser };
    state[checkbox.name] = checkboxValue;

    this.setState(state);
  };

  render() {
    const { newPoshUser, errors, generate } = this.state;
    let identifierInvalid = false;
    let identifierErrors = '';

    if (generate && errors.email) {
      identifierInvalid = true;
      identifierErrors = errors.email;
    } else if (!generate && errors.username) {
      identifierInvalid = true;
      identifierErrors = errors.username;
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
        </Row>
        <Form.Group
          className="mb-3"
          controlId={generate ? 'email' : 'username'}
        >
          <Form.Label>{generate ? 'Email' : 'Username'}</Form.Label>
          <Form.Control
            type="text"
            name={generate ? 'email' : 'username'}
            value={generate ? newPoshUser.email : newPoshUser.username}
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
