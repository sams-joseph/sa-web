import styled from 'styled-components';
import { Link } from 'react-router-dom';
import constants from '../../constants';

export const Form = styled.form`
  font-family: ${constants.fontFamily};
  font-size: ${constants.fontSizeMedium};
  color: ${constants.almostBlack};
  width: 350px;
  margin: 70px auto 70px auto;
  display: block;
`;

export const StyledLink = styled(Link)`
  color: ${constants.defaultPrimaryColor};
  margin-top: 20px;
  display: block;
  text-align: center;
  text-decoration: none;
  transition: color 0.125s;

  &:hover {
    color: ${constants.defaultPrimaryColorMuted};
  }
`;

export const Heading = styled.h1`
  text-align: center;
  margin-bottom: 40px;
`;

export const Input = styled.input`
  border: 1px solid ${props => (props.error ? constants.colorDanger : constants.almostWhite)};
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  border-radius: 2px;

  &:focus {
    outline: none;
    border: 1px solid ${constants.defaultPrimaryColor};
  }
`;

export const Button = styled.button`
  color: white;
  border: none;
  border-radius: 2px;
  background: ${constants.defaultPrimaryColor};
  padding: 10px;
  width: 100%;
  cursor: pointer;
  transition: background 0.125s;

  &:hover {
    background: ${constants.defaultPrimaryColorMuted};
  }

  &:focus {
    outline: none;
  }
`;
