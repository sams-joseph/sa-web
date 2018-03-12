import styled from 'styled-components';

export const Container = styled.div`
  width: 150px;
  display: ${props => (props.open ? 'flex' : 'none')};
  flex-wrap: wrap;
  background: #383854;
  border: 1px solid rgba(250, 250, 250, 0.1);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
  position: absolute;
`;

export const ColorBox = styled.div`
  flex: 0 0 25px;
  height: 20px;
  background: ${props => props.hex};
  cursor: pointer;
`;

export const SelectedColorBar = styled.div`
  background: #29293f;
  flex: 0 0 100%;
  height: 30px;
  padding: 6px;
`;

export const SelectedColor = styled.div`
  width: 25px;
  height: 20px;
  background: ${props => props.hex};
  border: 1px solid black;
`;
