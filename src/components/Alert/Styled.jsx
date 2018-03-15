import styled from 'styled-components';
import constants from '../constants';

export const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const StyledMessage = styled.div`
  width: 100%;
  height: 50px;
  background: ${props => {
    if (props.type === 'success') {
      return constants.colorSuccess;
    } else if (props.type === 'info') {
      return constants.colorInfo;
    } else if (props.type === 'danger') {
      return constants.colorDanger;
    }
    return constants.colorDefault;
  }};
  line-height: 50px;
  color: white;
  font-family: ${constants.fontFamily};
  font-size: ${constants.fontSizeMedium};
  margin-bottom: ${props => (props.margin ? '20px' : '0')};
  position: relative;
  z-index: 0;
`;

export const MessageHeading = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
`;

export const MessageIcon = styled.img`
  height: 30px;
  margin-right: 10px;
`;

export const MessageText = styled.span`
  line-height: 50px;
`;

export const CloseMessageBtn = styled.button`
  background: ${props => {
    if (props.type === 'success') {
      return constants.colorSuccessDark;
    } else if (props.type === 'info') {
      return constants.darkPrimaryHoverColor;
    } else if (props.type === 'danger') {
      return constants.colorDangerDark;
    }
    return constants.colorDefaultDark;
  }};
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.125s;

  &: hover {
    background: ${props => {
      if (props.type === 'success') {
        return constants.colorSuccessHover;
      } else if (props.type === 'info') {
        return constants.darkPrimaryColor;
      } else if (props.type === 'danger') {
        return constants.colorDangerHover;
      }
      return constants.colorDefaultHover;
    }};
  }

  &: focus {
    outline: none;
  }
`;
