import styled from 'styled-components';
import constants from '../constants';

export const Container = styled.div`
  margin-bottom: 70px;
`;

export const Heading = styled.h1`
  color: ${constants.almostBlack};
  font-size: 2em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin-bottom: 90px;
  margin-top: 70px;
`;

export const ShippingList = styled.ul`
  display: block;
  list-style-type: none;
  padding: 0;
  margin: 0 0 50px 0;
`;

export const ShippingHeading = styled.li`
  color: ${constants.almostBlack};
  font-size: 1em;
  font-weight: ${constants.fontWeightMedium};
  font-family: ${constants.fontFamily};
  margin-bottom: 10px;
`;

export const ShippingListItem = styled.li`
  color: ${constants.almostBlack};
  font-size: 1em;
  font-weight: ${constants.fontWeightNormal};
  font-family: ${constants.fontFamily};
`;
