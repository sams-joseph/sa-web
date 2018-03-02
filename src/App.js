import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Reboot from 'material-ui/Reboot';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CheckCircle from 'material-ui-icons/CheckCircle';
import AlertMessage from './components/messages/AlertMessage';
import Alert from './components/Alert';
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

import { closeAlertMessage, closeLoginMessage } from './actions/message';

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
        {isAuthenticated && <Alert />}
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
