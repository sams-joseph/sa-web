import styled from 'styled-components';
import constants from '../../constants';

export const Icon = styled.span`
  display: block;
  background: ${constants.colorBlueOne};
  color: #ffffff;
  height: 35px;
  line-height: 35px;
  border-radius: 50px;
  width: 35px;
  text-align: center;
`;

export const UserMenuBtn = styled.div`
  display: flex;
  transition: border 0.125s;
  cursor: pointer;
`;

export const UserMenuToggle = styled.img`
  margin-left: 10px;
  width: 15px;
`;
