import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Settings from 'material-ui-icons/Settings';
import PowerSettingsNew from 'material-ui-icons/PowerSettingsNew';
import { MenuItem } from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import { logout } from '../../../actions/auth';
import { NavigationGroupRight, MainNavigationLink, CreateOrderBtn, LoginBtn } from './Styled';

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

  logout = () => {
    this.props.logout();
    this.setState({ anchorEl: null });
  };

  render() {
    const { isAuthenticated } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar color="default">
        <ToolBar>
          <div style={{ flex: 1 }}>
            <MainNavigationLink exact to="/">
              Home
            </MainNavigationLink>
            {isAuthenticated && <MainNavigationLink to="/dashboard">Dashboard</MainNavigationLink>}
            {isAuthenticated && <MainNavigationLink to="/products">Products</MainNavigationLink>}
          </div>
          {isAuthenticated ? (
            <NavigationGroupRight>
              <CreateOrderBtn to="/select-design">Order</CreateOrderBtn>
            </NavigationGroupRight>
          ) : (
            <NavigationGroupRight>
              <LoginBtn to="/login">Login</LoginBtn>
            </NavigationGroupRight>
          )}
          {isAuthenticated && (
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="default"
              >
                <AccountCircle />
              </IconButton>
              <Popover
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText inset primary="My account" />
                </MenuItem>
                <MenuItem onClick={this.logout}>
                  <ListItemIcon>
                    <PowerSettingsNew />
                  </ListItemIcon>
                  <ListItemText inset primary="Logout" />
                </MenuItem>
              </Popover>
            </div>
          )}
        </ToolBar>
      </AppBar>
    );
  }
}

const { bool, func } = PropTypes;
TopNavigation.propTypes = {
  isAuthenticated: bool.isRequired,
  logout: func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

export default connect(mapStateToProps, { logout })(TopNavigation);
