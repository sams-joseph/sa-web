import styled from 'styled-components';
import constants from '../constants';

export const Wrapper = styled.div``;

export const Container = styled.div`
  font-family: ${constants.fontFamily};
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  position: relative;
  background: ${props => (props.bkg ? props.bkg : '')};
`;

export const FlexContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Heading = styled.h1`
  color: ${constants.almostBlack};
  font-size: 2em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin-bottom: 40px;
  margin-top: 70px;
`;

export const AccountIconSmall = styled.img`
  height: 40px;
  margin-right: 20px;
`;

export const StyledList = styled.ul`
  padding: 40px 0;
  margin: 0;
  list-style-type: none;
  color: ${constants.almostBlack};
`;

export const StyledListItem = styled.li`
  padding: 0;
  margin: 0 0 20px 0;
  line-height: 30px;
`;

export const ListHeading = styled.div`
  font-weight: ${constants.fontWeightMedium};
`;

export const DropzoneText = styled.p`
  color: ${constants.almostBlack};
  line-height: 150px;
  margin: 0;
  padding: 0;
  text-align: center;
`;
