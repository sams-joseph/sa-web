import styled from 'styled-components';
import constants from '../constants';

export const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  padding: 0 20px;
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

export const CartIconSmall = styled.img`
  height: 40px;
  margin-right: 20px;
`;

export const EmptyMessage = styled.h1`
  color: ${constants.almostBlack};
  font-size: 2em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  text-align: center;
  max-width: 400px;
  margin: 30px auto 0 auto;
`;

export const CartIcon = styled.img`
  display: block;
  margin: 0 auto;
  height: 100px;
  opacity: 0.3;
  transform: translateX(-10px);
`;
