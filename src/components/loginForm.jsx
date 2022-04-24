import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import * as actions from '../store/api';
import { connect } from 'react-redux';

const Joi = require('joi-browser');

class LoginForm extends Component {
  state = {
    user: {
      username: '',
      password: '',
    },
    validated: false,
    errors: {},
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    form.checkValidity();
    const errors = this.validate();
    const validated = errors ? false : true;

    this.setState({ validated, errors });
    if (validated) {
      this.props.login(this.state.user);
      this.setState({ errors: {} });
    }
  };

  validate = () => {
    const result = Joi.validate(this.state.user, this.schema, {
      abortEarly: false,
    });

    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const user = { ...this.state.user };

    user[input.name] = input.value;

    this.setState({ user });
  };

  render() {
    const { user, errors } = this.state;
    if (this.props.isAuthenticated) {
      return <Navigate to="/posh-users" replace />;
    }
    return (
      <Row style={{ justifyContent: 'center' }} className="p-5">
        <Col sm={6} className="border border-secondary rounded py-3 px-4">
          <h1>Login</h1>
          <Form id="loginForm" onSubmit={this.handleSubmit} validated={false}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={user.username}
                onChange={this.handleChange}
                required
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={this.handleChange}
                required
                value={user.password}
                isInvalid={errors.password ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => {
    dispatch(
      actions.apiCallBegan({
        url: '/auth/token/create/',
        method: 'POST',
        data: payload,
        onSuccess: 'user/loggedIn',
      })
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
