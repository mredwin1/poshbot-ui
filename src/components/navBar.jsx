import React, { Component } from 'react';
import PrivateNavBar from './privateNavBar';
import PublicNavBar from './publicNavBar';
import { connect } from 'react-redux';

class NavBar extends Component {
  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) return <PublicNavBar />;
    return <PrivateNavBar />;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
