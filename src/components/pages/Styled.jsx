import styled from 'styled-components';
import constants from '../constants';

export const Container = styled.div`
  font-family: ${constants.fontFamily};
  max-width: 1100px;
  min-height: calc(100vh - 180px);
  margin: 70px auto 0 auto;
  width: 100%;
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
  margin-bottom: 50px;
`;

export const Hero = styled.div`
  background: url(${props => props.img}) no-repeat;
  background-position: center;
  background-size: cover;
  height: 400px;
  width: 100%;
`;
