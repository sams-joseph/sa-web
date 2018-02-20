import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, UserMenuBtn, UserMenuToggle } from './Styled';
import chevronDown from './chevron-down.svg';

class UserIcon extends Component {
  state = {
    toggled: false,
  };

  onToggle = () => {
    this.setState({
      toggled: !this.state.toggled,
    });
    this.props.onToggle(!this.state.toggled);
  };

  render() {
    const { firstName, lastName } = this.props;
    return (
      <UserMenuBtn onClick={this.onToggle}>
        <Icon>
          {firstName[0]}
          {lastName[0]}
        </Icon>
        <UserMenuToggle src={chevronDown} alt="User Menu" />
      </UserMenuBtn>
    );
  }
}

const { string, func } = PropTypes;
UserIcon.propTypes = {
  firstName: string.isRequired,
  lastName: string.isRequired,
  onToggle: func.isRequired,
};

export default UserIcon;
