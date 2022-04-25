import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

const Joi = require('joi-browser');

class PoshUserForm extends Component {
  state = {
    newPoshUser: {
      email: '',
      password: '',
    },
    validated: false,
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label('Email'),
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
      const { email, password } = this.state.newPoshUser;
      this.props.addPoshUser({ email, password });

      this.props.onHide();
      this.setState({
        newPoshUser: {
          email: '',
          password: '',
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
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
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
      </Form>
    );
  }
}

export default PoshUserForm;
