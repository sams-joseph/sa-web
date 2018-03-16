import styled from 'styled-components';
import constants from '../constants';

export const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  padding: 0 23px;
  margin: 70px auto;
`;

export const Heading = styled.h1`
  color: ${constants.almostBlack};
  font-size: 2em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin-bottom: 50px;
  margin-top: 70px;
`;
