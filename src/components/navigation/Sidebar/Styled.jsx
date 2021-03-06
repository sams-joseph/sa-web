import styled from 'styled-components';
import constants from '../../constants';

export const SidebarContainer = styled.div`
  font-family: ${constants.fontFamily};
  width: 400px;
`;

export const SidebarHeading = styled.h3`
  background: #1e1e30;
  color: white;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin: 0 0 10px 0;
  padding: 20px;
`;

export const SidebarForm = styled.div`
  padding: 0;
`;

export const Spacer = styled.div`
  height: 64px;
`;
