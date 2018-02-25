import React from 'react';
import PropTypes from 'prop-types';
import { SidebarContainer, SidebarHeading } from './Styled';

function Sidebar({ children }) {
  return (
    <SidebarContainer>
      <SidebarHeading>Product Customization</SidebarHeading>
      {children}
    </SidebarContainer>
  );
}

const { arrayOf, node } = PropTypes;
Sidebar.propTypes = {
  children: arrayOf(node).isRequired,
};

export default Sidebar;
