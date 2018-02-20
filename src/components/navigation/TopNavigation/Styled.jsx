import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import constants from '../../constants';

export const Container = styled.div`
  font-family: ${constants.fontFamily};
  width: 100%;
  border-bottom: 1px solid ${constants.almostWhite};
  padding: 20px 20px;
  position: relative;
`;

export const MainNavigation = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
`;

export const NavigationGroupLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const NavigationGroupRight = styled.div`
  display: flex;
  align-items: center;
`;

export const UserName = styled.span`
  padding: 0 20px;
`;

export const MainNavigationLink = styled(NavLink)`
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
    border-bottom: 2px solid ${constants.defaultPrimaryColorMuted};
  }

  &.active {
    color: ${constants.defaultPrimaryColor};
  }
`;

export const CreateOrderBtn = styled.button`
  border: 1px solid ${constants.colorBlueOne};
  border-radius: 2px;
  color: ${constants.colorBlueOne};
  background: transparent;
  height: 35px;
  padding: 0 20px;
  margin-right: 20px;
  cursor: pointer;
  transition: color 0.125s, background 0.125s;

  &:hover {
    color: #ffffff;
    background: ${constants.colorBlueOne};
  }

  &:focus {
    outline: none;
  }
`;

export const LoginBtn = styled(Link)`
  border: none;
  border-radius: 2px;
  color: #ffffff;
  background: ${constants.colorBlueOne};
  height: 35px;
  padding: 0 20px;
  margin-right: 20px;
  cursor: pointer;
  line-height: 32px;
  text-decoration: none;

  &:hover {
    color: #ffffff;
  }

  &:focus {
    outline: none;
  }
`;
