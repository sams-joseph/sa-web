import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Settings from 'material-ui-icons/Settings';
import Security from 'material-ui-icons/Security';
import Dashboard from 'material-ui-icons/Dashboard';
import CreateNewFolder from 'material-ui-icons/CreateNewFolder';
import LibraryBooks from 'material-ui-icons/LibraryBooks';
import PowerSettingsNew from 'material-ui-icons/PowerSettingsNew';
import Dehaze from 'material-ui-icons/Dehaze';
import { MenuItem } from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import { logout } from '../../../actions/auth';
import CartBadge from '../../CartBadge';
import {
  NavigationGroupRight,
  MainNavigationLink,
  CreateOrderBtn,
  AuthNavigation,
  MobileNavButton,
  ScreenNav,
  MobileNav,
} from './Styled';
import Logo from './images/mmt-logo.svg';

const style = {
  appBar: {
    background: 'white',
    zIndex: 2,
    position: 'relative',
    padding: 0,
  },
};

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
      <AppBar style={style.appBar} position="static" elevation={0}>
        <ToolBar style={{ maxWidth: '1140px', margin: '0 auto', width: '100%' }}>
          <img src={Logo} alt="MMT" height="40" width="40" style={{ marginRight: '20px', marginLeft: '-5px' }} />
          <div style={{ flex: 1 }}>
            {isAuthenticated && (
              <AuthNavigation>
                <MainNavigationLink to="/dashboard">Dashboard</MainNavigationLink>
                <MainNavigationLink to="/orders">Orders</MainNavigationLink>
              </AuthNavigation>
            )}
          </div>
          {isAuthenticated ? (
            <NavigationGroupRight>
              <CreateOrderBtn to="/create-order">Order</CreateOrderBtn>
            </NavigationGroupRight>
          ) : (
            <NavigationGroupRight>
              <Button variant="raised" color="primary" component={Link} to="/login">
                Login
              </Button>
            </NavigationGroupRight>
          )}
          {isAuthenticated && (
            <div>
              <CartBadge />
              <ScreenNav>
                <IconButton aria-owns={open ? 'menu-appbar' : null} aria-haspopup="true" onClick={this.handleMenu}>
                  <AccountCircle />
                </IconButton>
              </ScreenNav>
              <MobileNavButton>
                <IconButton aria-owns={open ? 'menu-appbar' : null} aria-haspopup="true" onClick={this.handleMenu}>
                  <Dehaze />
                </IconButton>
              </MobileNavButton>
              <Popover
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: -50,
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                {this.props.isAdmin && (
                  <MenuItem component={Link} to="/admin" onClick={this.handleClose}>
                    <ListItemIcon style={{ width: '18px', height: '18px' }}>
                      <Security />
                    </ListItemIcon>
                    <ListItemText inset primary="Admin" />
                  </MenuItem>
                )}
                <MobileNav>
                  <MenuItem component={Link} to="/dashboard" onClick={this.handleClose}>
                    <ListItemIcon style={{ width: '18px', height: '18px' }}>
                      <Dashboard />
                    </ListItemIcon>
                    <ListItemText inset primary="Dashboard" />
                  </MenuItem>
                  <MenuItem component={Link} to="/orders" onClick={this.handleClose}>
                    <ListItemIcon style={{ width: '18px', height: '18px' }}>
                      <LibraryBooks />
                    </ListItemIcon>
                    <ListItemText inset primary="Orders" />
                  </MenuItem>
                  <MenuItem component={Link} to="/create-order" onClick={this.handleClose}>
                    <ListItemIcon style={{ width: '18px', height: '18px' }}>
                      <CreateNewFolder />
                    </ListItemIcon>
                    <ListItemText inset primary="Order" />
                  </MenuItem>
                </MobileNav>
                <MenuItem component={Link} to="/account" onClick={this.handleClose}>
                  <ListItemIcon style={{ width: '18px', height: '18px' }}>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText inset primary="My account" />
                </MenuItem>
                <MenuItem onClick={this.logout}>
                  <ListItemIcon style={{ width: '18px', height: '18px' }}>
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
  isAdmin: bool.isRequired,
  logout: func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    isAdmin: state.user.roleId === 1,
  };
}

export default connect(mapStateToProps, { logout })(TopNavigation);
