import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import TopNavigation from './components/navigation/TopNavigation';
import ProductsPage from './components/pages/ProductsPage';
import DesignsPage from './components/pages/DesignsPage';
import Footer from './components/Footer';

import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

const App = ({ location }) => (
  <div>
    <TopNavigation location={location} />
    <Route location={location} path="/" exact component={HomePage} />
    <Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
    <UserRoute location={location} path="/products" exact component={ProductsPage} />
    <UserRoute location={location} path="/designs" exact component={DesignsPage} />
    <Route location={location} path="/reset-password" exact component={ResetPasswordPage} />
    <Footer />
  </div>
);

const { shape, string } = PropTypes;
App.propTypes = {
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
};

export default App;
