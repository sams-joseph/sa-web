import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { Spacer, SidebarForm, SidebarHeading } from './Styled';

function Sidebar({ children }) {
  return (
    <Drawer variant="permanent">
      <SidebarHeading>Product Features</SidebarHeading>
      <SidebarForm>{children}</SidebarForm>
      <Spacer />
    </Drawer>
  );
}

const { arrayOf, node } = PropTypes;
Sidebar.propTypes = {
  children: arrayOf(node).isRequired,
};

export default Sidebar;
