import styled from 'styled-components';
import constants from '../constants';

export const StageContainer = styled.div`
  color: white;
  width: 100%;
  margin-top: 40px;
  height: 229px;
  background: ${props => (props.img ? `url(${props.img})` : constants.almostWhite)};
  background-size: cover;
  background-position: center;
  border: 1px dashed ${constants.almostBlack};
`;
