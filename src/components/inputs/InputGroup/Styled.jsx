import styled from 'styled-components';
import constants from '../../constants';

export const Container = styled.div`
  color: rgba(0, 0, 0, 0.54);
  font-family: ${constants.fontFamily};
  font-size: 12px;
  margin-top: 15px;

  & > input {
    margin-top: 10px;
  }

  & input[type='file'] {
  }
`;
