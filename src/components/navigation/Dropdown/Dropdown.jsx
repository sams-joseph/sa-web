import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DropDown, DropDownLink, DropDownContainer, DropDownLinkIcon, DropDownLinkText } from './Styled';
import * as actions from '../../../actions/auth';
import logoutIcon from './images/log-out.svg';

function Dropdown({ logout }) {
  return (
    <DropDownContainer>
      <DropDown>
        <DropDownLink onClick={() => logout()}>
          <DropDownLinkIcon src={logoutIcon} alt="" />
          <DropDownLinkText>Logout</DropDownLinkText>
        </DropDownLink>
      </DropDown>
    </DropDownContainer>
  );
}

const { func } = PropTypes;
Dropdown.propTypes = {
  logout: func.isRequired,
};

export default connect(null, { logout: actions.logout })(Dropdown);
