import styled from 'styled-components';
import constants from '../../constants';

export const Container = styled.div`
  color: rgb(181, 181, 181);
  font-family: ${constants.fontFamily};
  font-size: 12px;
  margin-top: 15px;

  & > input {
    margin-top: 10px;
  }

  & input[type='file'] {
  }
`;
