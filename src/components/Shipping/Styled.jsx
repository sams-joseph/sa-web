import styled from 'styled-components';
import constants from '../constants';

export const Heading = styled.h1`
  color: ${constants.almostBlack};
  font-size: 2em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin-bottom: 50px;
  margin-top: 70px;
`;

export const Form = styled.form`
  max-width: 600px;
  margin-bottom: 70px;
`;
