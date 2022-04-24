import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Navigate to="/login" replace />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch({ type: 'user/loggedOut' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
