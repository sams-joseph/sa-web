import styled from 'styled-components';
import constants from '../../constants';

export const DropDownContainer = styled.div`
  position: absolute;
  right: 0;
  top: 55px;
`;

export const DropDown = styled.div`
  padding: 5px;
  background: #f7f9fc;
  border: 1px solid #e3e3e3;
  border-radius: 0px;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1), 0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
`;

export const DropDownLink = styled.button`
  position: relative;
  background: transparent;
  border-radius: 2px;
  color: ${constants.almostBlack};
  cursor: pointer;
  width: 200px;
  border: none;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  z-index: 1200;

  &:hover {
  }

  &:focus {
    outline: none;
  }
`;

export const DropDownLinkIcon = styled.img`
  margin-right: 20px;
  height: 20px;
`;

export const DropDownLinkText = styled.span``;
