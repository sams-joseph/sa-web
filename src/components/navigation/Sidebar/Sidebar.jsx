import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { Scrollbars } from 'react-custom-scrollbars';
import { Spacer, SidebarForm, SidebarHeading } from './Styled';

function Sidebar({ children }) {
  return (
    <Drawer variant="permanent">
      <SidebarHeading>Product Features</SidebarHeading>
      <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
        <SidebarForm>{children}</SidebarForm>
      </Scrollbars>
      <Spacer />
    </Drawer>
  );
}

const { arrayOf, node } = PropTypes;
Sidebar.propTypes = {
  children: arrayOf(node).isRequired,
};

export default Sidebar;
