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
import PowerSettingsNew from 'material-ui-icons/PowerSettingsNew';
import { MenuItem } from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import { logout } from '../../../actions/auth';
import { NavigationGroupRight, MainNavigationLink, CreateOrderBtn } from './Styled';

const style = {
  appBar: {
    background: '#fafafa',
    zIndex: 2,
    position: 'relative',
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
      <AppBar style={style.appBar} position="static">
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
              <CreateOrderBtn to="/design">Order</CreateOrderBtn>
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
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                style={{ color: 'rgb(75,75,75)' }}
              >
                <AccountCircle />
              </IconButton>
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
                <MenuItem onClick={this.handleClose}>
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
  logout: func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

export default connect(mapStateToProps, { logout })(TopNavigation);
