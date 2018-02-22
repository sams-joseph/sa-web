import styled from 'styled-components';
import constants from '../../constants';

export const SidebarContainer = styled.div`
  border-right: 1px solid ${constants.almostWhite};
  border-left: 1px solid ${constants.almostWhite};
  font-family: ${constants.fontFamily};
  width: 400px;

  & > div {
    margin: 20px;
  }
`;

export const SidebarHeading = styled.h3`
  background: ${constants.almostBlack};
  color: white;
  font-weight: ${constants.fontWeightLight};
  margin: 0 0 30px 0;
  padding: 20px;
`;
