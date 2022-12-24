import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { apiCallBegan } from './../store/api';
import { connect } from 'react-redux';

const Joi = require('joi-browser');

class PoshUserForm extends Component {
  state = {
    newPoshUser: {
      email: '',
      password: '',
      quantity: 1,
    },
    validated: false,
    errors: {},
  };

  schema = {
    email: Joi.string().required().label('Email'),
    password: Joi.string()
      .min(6)
      .regex(/[!@#$%^&*_0-9]/, 'special character or number')
      .label('Password')
      .options({
        language: {
          any: { allowOnly: 'must contain a number or special character' },
        },
      }),
    quantity: Joi.number().required().label('Quantity'),
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    form.checkValidity();
    const errors = this.validate();
    const validated = errors ? false : true;

    this.setState({ validated, errors });
    if (validated) {
      let { email, password, quantity } = this.state.newPoshUser;
      let payload = [];
      let indexOfAt = -1;
      let indexOfPlus = -1;
      if (email.indexOf('+') === -1) {
        indexOfAt = email.indexOf('@');
        email = `${email.substring(0, indexOfAt)}+1${email.substring(
          indexOfAt,
          email.length
        )}`;
      }

      for (let i = 0; i < quantity; i++) {
        console.log(email);
        payload.push({ email, password });
        indexOfAt = email.indexOf('@');
        indexOfPlus = email.indexOf('+');
        let emailNumber =
          parseInt(email.substring(indexOfPlus + 1, indexOfAt)) + i;
        email = `${email.substring(
          0,
          indexOfPlus + 1
        )}${emailNumber}${email.substring(indexOfAt, email.length)}`;
        console.log(email.substring(indexOfPlus + 1, indexOfAt));
      }
      this.props.addPoshUser(payload);

      this.props.onHide();
      this.setState({
        newPoshUser: {
          email: '',
          password: '',
          quantity: 1,
        },
        errors: {},
      });
    }
  };

  validate = () => {
    const result = Joi.validate(this.state.newPoshUser, this.schema, {
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

  render() {
    const { newPoshUser, errors } = this.state;
    return (
      <Form id="poshUserAddForm" onSubmit={this.handleSubmit} validated={false}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={newPoshUser.email}
            onChange={this.handleChange}
            isInvalid={errors.email ? true : false}
            required
            autoFocus
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
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
        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={newPoshUser.quantity}
            onChange={this.handleChange}
            isInvalid={errors.quantity ? true : false}
            required
            autoFocus
          />
          <Form.Control.Feedback type="invalid">
            {errors.quantity}
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
        url: '/posh-users/generate/',
        method: 'POST',
        data: payload,
        onSuccess: 'poshUsers/added',
      })
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PoshUserForm);
