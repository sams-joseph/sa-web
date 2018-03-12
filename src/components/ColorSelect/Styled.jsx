import styled from 'styled-components';

export const Container = styled.div`
  width: 150px;
  min-height: 40px;
  display: ${props => (props.open ? 'flex' : 'none')};
  background: #383854;
  border: 1px solid rgba(250, 250, 250, 0.1);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
  position: absolute;
`;

export const ColorBox = styled.div`
  width: 25px;
  height: 20px;
  background: ${props => props.hex};
  cursor: pointer;
`;
