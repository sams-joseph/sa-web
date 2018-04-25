import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import constants from '../../constants';

export const Container = styled.div`
  font-family: ${constants.fontFamily};
  width: 100%;
  border-bottom: 1px solid ${constants.almostWhite};
  padding: 20px 20px;
  position: relative;
`;

export const MainNavigation = styled.header`
  font-family: ${constants.fontFamily};
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
`;

export const NavigationGroupLeft = styled.div`
  font-family: ${constants.fontFamily};
  display: flex;
  align-items: center;
`;

export const NavigationGroupRight = styled.div`
  font-family: ${constants.fontFamily};
  display: flex;
  align-items: center;
`;

export const UserName = styled.span`
  padding: 0 20px;
`;

export const MainNavigationLink = styled(NavLink)`
  font-family: ${constants.fontFamily};
  border-bottom: 2px solid transparent;
  margin-right: 20px;
  color: ${constants.almostBlack};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  padding: 10px 0;
  transition: border 0.125s, color 0.125s;

  &:hover {
    color: ${constants.defaultPrimaryColor};
    border-bottom: 2px solid ${constants.defaultPrimaryColor};
    text-decoration: none;
  }

  &.active {
    color: ${constants.defaultPrimaryColor};
  }
`;

export const CreateOrderBtn = styled(Link)`
  border: 1px solid ${constants.defaultPrimaryColor};
  border-radius: 2px;
  color: ${constants.defaultPrimaryColor};
  background: transparent;
  height: 35px;
  padding: 0 20px;
  margin-right: 20px;
  cursor: pointer;
  text-decoration: none;
  line-height: 35px;
  transition: color 0.125s, background 0.125s;

  &:hover {
    color: #ffffff;
    background: ${constants.defaultPrimaryColor};
    text-decoration: none;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const LoginBtn = styled(Link)`
  border: none;
  border-radius: 2px;
  color: #ffffff;
  background: ${constants.defaultPrimaryColor};
  height: 35px;
  padding: 0 20px;
  margin-right: 20px;
  cursor: pointer;
  line-height: 32px;
  text-decoration: none;

  &:hover {
    color: #ffffff;
    text-decoration: none;
  }

  &:focus {
    outline: none;
  }
`;

export const MaterialAppBar = styled(AppBar)`
  & > header {
    box-shadow: none;
  }
`;

export const AuthNavigation = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

export const ScreenNav = styled.span`
  @media (max-width: 600px) {
    display: none;
  }
`;

export const MobileNavButton = styled.span`
  display: none;

  @media (max-width: 600px) {
    display: inline;
  }
`;

export const MobileNav = styled.span`
  display: none;

  @media (max-width: 600px) {
    display: inline;
  }
`;
