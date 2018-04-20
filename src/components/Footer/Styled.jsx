import styled from 'styled-components';
import constants from '../constants';

export const StyledFooter = styled.footer`
  background: ${constants.almostWhite};
  margin-top: 140px;
  height: 75px;
  width: 100%;
`;

export const Container = styled.div`
  font-family: ${constants.fontFamily};
  font-size: ${constants.fontSizeSmall};
  max-width: 1140px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
`;

export const FooterText = styled.p`
  color: ${constants.almostBlack};
  line-height: 75px;
  padding: 0;
  margin: 0;
`;

export const Version = styled.p`
  color: ${constants.almostBlack};
  font-size: ${constants.fontSizeTiny};
  line-height: 75px;
  padding: 0;
  margin: 0;
`;
