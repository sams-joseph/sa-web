import styled from 'styled-components';
import constants from '../constants';

export const StyledContainer = styled.div`
  display: flex;
  font-family: ${constants.fontFamily};
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  max-width: 1040px;
  padding: 0 20px;
  margin: 0 auto;
`;

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`;
