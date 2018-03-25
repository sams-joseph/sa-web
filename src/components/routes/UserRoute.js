import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import * as actions from '../../actions/auth';

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />
);

const { func, bool } = PropTypes;
UserRoute.propTypes = {
  component: func.isRequired,
  isAuthenticated: bool.isRequired,
};

UserRoute.defaultProps = {
  token: '',
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    token: state.user.token,
  };
}

export default connect(mapStateToProps, { validateToken: actions.validateToken })(UserRoute);
