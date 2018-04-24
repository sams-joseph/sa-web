import styled from 'styled-components';
import { Link } from 'react-router-dom';
import constants from '../constants';

export const Container = styled.div`
  max-width: 400px;
  width: 100%;
  margin-left: 40px;

  @media (max-width: 900px) {
    margin-left: 0;
    max-width: 100%;
    order: -1;
  }
`;

export const SubHeading = styled.h2`
  color: ${constants.almostBlack};
  font-size: 1.25em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin-bottom: 30px;
  margin-top: 0;
`;

export const OrderLink = styled(Link) `
  display: inline-block;
  margin-bottom: 20px;
`;

export const SectionIcon = styled.img`
  height: 20px;
  margin-right: 6px;
`;

export const EmptyIcon = styled.img`
  display: block;
  height: 30px;
  opacity: 0.5;
  margin: 50px auto 20px auto;
`;

export const EmptyText = styled.p`
  text-align: center;
  color: ${constants.almostBlack};
  font-size: 1em;
  opacity: 0.5;
  font-weight: ${constants.fontWeightMedium};
  font-family: ${constants.fontFamily};
  margin-top: 0;
`;
