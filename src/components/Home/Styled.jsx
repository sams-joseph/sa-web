import styled from 'styled-components';
import constants from '../constants';

export const Wrapper = styled.div``;

export const Container = styled.div`
  font-family: ${constants.fontFamily};
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 23px;
  width: 100%;
  position: relative;
  background: ${props => (props.bkg ? props.bkg : '')};
`;

export const FlexContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Heading = styled.h1`
  color: ${constants.almostBlack};
  font-size: 2em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin-bottom: 50px;
  margin-top: 70px;
`;

export const Hero = styled.div`
  background: url(${props => props.img}) no-repeat;
  background-position: center;
  background-size: cover;
  height: 400px;
  width: 100%;
`;

export const CanvasControls = styled.div`
  background: ${constants.almostWhite};
  display: flex;
  width: 100%;
  margin-top: 20px;
  height: 50px;

  & button {
    border: none;
    border-right: 1px solid #d0d4dd;
    background: transparent;
    height: 50px;
    transition: background 0.125s;
    padding: 5px 15px 0 15px;
    cursor: pointer;

    & img {
      height: 18px;
    }

    &:hover {
      background: #d0d4dd;
    }
  }
`;

export const ColorInput = styled.input`
  height: 30px;
  border: none;
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const DropzoneText = styled.p`
  color: ${constants.almostWhite};
  line-height: 100px;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export const SelectedFeatures = styled.ul`
  display: flex;
  color: white;
  list-style-type: none;
  padding: 0;
  margin: 30px 0 0 0;

  li {
    display: flex;
    line-height: 24px;
    margin-right: 10px;
  }
`;
