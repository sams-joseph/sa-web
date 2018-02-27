import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
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
    anchorEl: null,
  };

  onToggle = toggleState => {
    this.setState({ toggled: toggleState });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { isAuthenticated, firstName, lastName } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Container>
        <AppBar color="default">
          <ToolBar>
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
            <Button size="small" component={Link} to="/">
              Home
            </Button>
            {isAuthenticated && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </ToolBar>
        </AppBar>
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
