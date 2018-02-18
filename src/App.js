import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import ConfirmationPage from './components/pages/ConfirmationPage';

import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

const App = ({ location }) => (
  <Container>
    <Route location={location} path="/" exact component={HomePage} />
    <Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
    <Route location={location} path="/reset-password" exact component={ResetPasswordPage} />
  </Container>
);

const { shape, string } = PropTypes;
App.propTypes = {
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
};

export default App;
