import styled from 'styled-components';
import constants from '../constants';

export const Container = styled.div`
  width: 100%;
`;

export const SubHeading = styled.h2`
  color: ${constants.almostBlack};
  font-size: 1.25em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin-bottom: 20px;
  margin-top: 0;
`;

export const SectionIcon = styled.img`
  height: 20px;
  margin-right: 6px;
`;
