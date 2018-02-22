import styled from 'styled-components';
import constants from '../../constants';

export const StyledInput = styled.input`
  border: 1px solid ${props => (props.error ? constants.colorDanger : constants.almostWhite)};
  padding: 10px;
  width: 100%;
  border-radius: 2px;

  &:focus {
    outline: none;
    border: 1px solid ${constants.defaultPrimaryColor};
  }
`;
