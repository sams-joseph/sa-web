import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserIcon from '../UserIcon';
import Dropdown from '../Dropdown';
import {
  MainNavigation,
  NavigationGroupRight,
  NavigationGroupLeft,
  MainNavigationLink,
  CreateOrderBtn,
  Container,
  LoginBtn,
} from './Styled';

class TopNavigation extends Component {
  state = {
    toggled: false,
  };

  onToggle = toggleState => {
    this.setState({ toggled: toggleState });
  };

  render() {
    const { isAuthenticated, firstName, lastName } = this.props;
    return (
      <Container>
        <MainNavigation>
          <NavigationGroupLeft>
            <MainNavigationLink exact to="/">
              Home
            </MainNavigationLink>
            {isAuthenticated && <MainNavigationLink to="/dashboard">Dashboard</MainNavigationLink>}
            {isAuthenticated && <MainNavigationLink to="/products">Products</MainNavigationLink>}
          </NavigationGroupLeft>
          {isAuthenticated ? (
            <NavigationGroupRight>
              <CreateOrderBtn to="/select-design">Order</CreateOrderBtn>
              <UserIcon onToggle={this.onToggle} firstName={firstName} lastName={lastName} />
            </NavigationGroupRight>
          ) : (
            <NavigationGroupRight>
              <LoginBtn to="/login">Login</LoginBtn>
            </NavigationGroupRight>
          )}
          {this.state.toggled && isAuthenticated && <Dropdown />}
        </MainNavigation>
      </Container>
    );
  }
}

const { bool, string } = PropTypes;
TopNavigation.propTypes = {
  isAuthenticated: bool.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
  };
}

export default connect(mapStateToProps)(TopNavigation);
