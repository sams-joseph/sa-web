import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Reboot from 'material-ui/Reboot';
import Snackbar from 'material-ui/Snackbar';
import AlertMessage from './components/messages/AlertMessage';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import TopNavigation from './components/navigation/TopNavigation';
import ProductsPage from './components/pages/ProductsPage';
import DesignsPage from './components/pages/DesignsPage';

import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

import { closeAlertMessage } from './actions/message';

class App extends Component {
  state = {
    welcomeMsg: true,
  };

  onClose = () => {
    this.setState({
      welcomeMsg: !this.props.isAuthenticated,
    });
  };

  toggleMessage = () => {
    this.props.closeAlertMessage(!this.props.showMessage);
  };

  render() {
    const { location, isConfirmed, isAuthenticated, showMessage } = this.props;
    const { welcomeMsg } = this.state;

    return (
      <div>
        {isAuthenticated && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={welcomeMsg}
            onClose={this.onClose}
            autoHideDuration={6000}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Hi, Welcome back</span>}
          />
        )}
        <Reboot />
        <TopNavigation location={location} />
        {!isConfirmed &&
          isAuthenticated &&
          showMessage && (
            <AlertMessage
              closable
              type="info"
              text="Your email has not been verified"
              toggleMessage={this.toggleMessage}
            />
          )}
        <Route location={location} path="/" exact component={HomePage} />
        <Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
        <GuestRoute location={location} path="/login" exact component={LoginPage} />
        <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
        <UserRoute location={location} path="/products" exact component={ProductsPage} />
        <UserRoute location={location} path="/select-design" exact component={DesignsPage} />
        <Route location={location} path="/reset-password" exact component={ResetPasswordPage} />
      </div>
    );
  }
}

const { shape, string, bool, func } = PropTypes;
App.propTypes = {
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
  isConfirmed: bool.isRequired,
  isAuthenticated: bool.isRequired,
  showMessage: bool.isRequired,
  closeAlertMessage: func.isRequired,
};

App.defaultProps = {
  showMessage: true,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    isAuthenticated: !!state.user.token,
    showMessage: state.navigation,
  };
}

export default connect(mapStateToProps, { closeAlertMessage })(App);
