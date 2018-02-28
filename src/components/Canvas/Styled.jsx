import styled from 'styled-components';
import constants from '../constants';

export const StageContainer = styled.div`
  color: white;
  width: ${props => props.width}px;
  margin-top: 40px;
  margin-bottom: 40px;
  height: ${props => props.height}px;
  background: ${props => (props.img ? `url(${props.img})` : constants.almostWhite)};
  background-size: cover;
  background-position: center;
  border: 1px solid ${constants.almostBlack};
`;
