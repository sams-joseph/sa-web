import styled from 'styled-components';
import { Link } from 'react-router-dom';
import constants from '../constants';

export const Container = styled.div`
  max-width: 400px;
  width: 100%;
  margin-left: 40px;
`;

export const SubHeading = styled.h2`
  color: ${constants.almostBlack};
  font-size: 1.25em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin-bottom: 30px;
  margin-top: 0;
`;

export const OrderLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
`;
