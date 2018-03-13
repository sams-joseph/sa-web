import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Reboot from 'material-ui/Reboot';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CheckCircle from 'material-ui-icons/CheckCircle';
import AlertMessage from '../messages/AlertMessage';
import Announce from '../Announce';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import TopNavigation from '../navigation/TopNavigation';
import Products from '../Products';
import Design from '../Design';
import Order from '../Order';

import UserRoute from '../routes/UserRoute';
import GuestRoute from '../routes/GuestRoute';

import { closeAlertMessage, closeLoginMessage } from '../../actions/message';

class App extends Component {
  onClose = () => {
    this.props.closeLoginMessage(!this.props.loginMessage);
  };

  toggleMessage = () => {
    this.props.closeAlertMessage(!this.props.alertMessage);
  };

  render() {
    const { location, isConfirmed, isAuthenticated, alertMessage, loginMessage } = this.props;

    return (
      <div>
        {isAuthenticated && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={loginMessage}
            onClose={this.onClose}
            autoHideDuration={5000}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Successfully logged in</span>}
            action={
              <IconButton>
                <CheckCircle style={{ color: '#00E676' }} />
              </IconButton>
            }
          />
        )}
        <Reboot />
        <TopNavigation location={location} />
        {isAuthenticated && <Announce />}
        {!isConfirmed &&
          isAuthenticated &&
          alertMessage && (
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
        <Route location={location} path="/reset-password" exact component={ResetPasswordPage} />
        <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
        <UserRoute location={location} path="/products" exact component={Products} />
        <UserRoute location={location} path="/design" exact component={Design} />
        <UserRoute location={location} path="/order" exact component={Order} />
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
  alertMessage: bool.isRequired,
  closeAlertMessage: func.isRequired,
  closeLoginMessage: func.isRequired,
  loginMessage: bool.isRequired,
};

App.defaultProps = {
  alertMessage: true,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    isAuthenticated: !!state.user.token,
    alertMessage: state.message.alert,
    loginMessage: state.message.login,
  };
}

export default connect(mapStateToProps, { closeAlertMessage, closeLoginMessage })(App);
