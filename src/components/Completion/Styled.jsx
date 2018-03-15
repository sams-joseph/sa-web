import styled from 'styled-components';
import constants from '../constants';

export const Container = styled.div`
  width: 500px;
  padding: 30px;
  margin: 0 auto 50px auto;
`;

export const CheckmarkCircle = styled.circle`
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: ${constants.colorSuccess};
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

export const Checkmark = styled.svg`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 0 auto 30px auto;
  box-shadow: inset 0px 0px 0px ${constants.colorSuccess};
  animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;

  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 50px ${constants.colorSuccess};
    }
  }

  @keyframes scale {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }
`;

export const CheckmarkCheck = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
`;
