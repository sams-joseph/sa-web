import styled from 'styled-components';
import constants from '../../constants';

export const Container = styled.div`
  color: ${constants.almostBlack};
  font-family: ${constants.fontFamily};
  font-size: ${constants.fontSizeMedium};
  margin-bottom: 20px;

  & > input {
    margin-top: 5px;
  }

  & input[type='file'] {
  }
`;
