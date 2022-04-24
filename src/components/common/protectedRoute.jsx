import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends Component {
  render() {
    const { isAuthenticated, children } = this.props;

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return children;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
