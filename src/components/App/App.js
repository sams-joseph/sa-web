import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CssBaseline from 'material-ui/CssBaseline';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CheckCircle from 'material-ui-icons/CheckCircle';
import Alert from '../Alert';
import Announce from '../Announce';
import Login from '../Login';
import Dashboard from '../Dashboard';
import ResetPassword from '../ResetPassword';
import Confirmation from '../Confirmation';
import TopNavigation from '../navigation/TopNavigation';
import Products from '../Products';
import Order from '../Order';
import Cart from '../Cart';
import Checkout from '../Checkout';
import OrderDetails from '../OrderDetails';

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
        <CssBaseline />
        <TopNavigation location={location} />
        {isAuthenticated && <Announce />}
        {!isConfirmed &&
          isAuthenticated &&
          alertMessage && (
            <Alert closable type="info" text="Your email has not been verified" toggleMessage={this.toggleMessage} />
          )}
        <Route location={location} path="/" exact component={Dashboard} />
        <Route location={location} path="/confirmation/:token" exact component={Confirmation} />
        <GuestRoute location={location} path="/login" exact component={Login} />
        <Route location={location} path="/reset-password" exact component={ResetPassword} />
        <UserRoute location={location} path="/dashboard" exact component={Dashboard} />
        <UserRoute location={location} path="/products" exact component={Products} />
        <UserRoute location={location} path="/create-order" exact component={Order} />
        <UserRoute location={location} path="/cart" exact component={Cart} />
        <UserRoute location={location} path="/checkout" exact component={Checkout} />
        <UserRoute location={location} path="/order/:id" exact component={OrderDetails} />
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
