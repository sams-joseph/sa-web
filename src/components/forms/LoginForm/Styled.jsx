import styled from 'styled-components';
import { Link } from 'react-router-dom';
import constants from '../../constants';

export const StyledForm = styled.form`
  background: #fff;
  max-width: 400px;
  padding: 30px;
  border: 1px solid ${constants.colorBlueTwo};
  border-radius: 6px;
`;

export const StyledHeading = styled.h1`
  color: ${constants.defaultPrimaryColor};
  font-family: ${constants.fontFamily};
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
  margin: 0 0 20px 0;
`;

export const StyledInput = styled.input`
  color: ${props => (props.error ? constants.colorDanger : constants.defaultPrimaryColor)};
  background: ${props => (props.error ? constants.colorDangerMuted : constants.colorBlueOne)};
  width: 100%;
  padding: 10px 20px;
  border: 1px solid ${props => (props.error ? constants.colorDanger : constants.colorBlueTwo)};
  border-radius: 3px;
  margin-bottom: 20px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => (props.error ? constants.colorDanger : constants.colorBlueFour)};
  }
`;

export const StyledButton = styled.button`
  color: #fff;
  width: 100%;
  padding: 10px 20px;
  border-radius: 3px;
  border: none;
  text-transform: uppercase;
  margin-bottom: 10px;
  background: ${constants.defaultPrimaryColor};

  &:focus {
    outline: none;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${constants.defaultPrimaryColor};
  font-family: ${constants.fontFamily};
  font-size: ${constants.fontSizeSmall};
  transition: color 0.25s;

  &:hover {
    color: ${constants.colorBlueFour};
  }
`;
