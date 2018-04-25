import styled from 'styled-components';
import constants from '../constants';

export const Wrapper = styled.div``;

export const Container = styled.div`
  font-family: ${constants.fontFamily};
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  position: relative;
  background: ${props => (props.bkg ? props.bkg : '')};
`;

export const Flex = styled.div`
  width: ${props => (props.width ? props.width : 'auto')};
  display: flex;
  margin-bottom: 50px;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

export const SectionHeader = styled.h2`
  color: ${constants.almostBlack};
  font-size: 1.5em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin-bottom: 5px;
`;

export const SectionDescription = styled.h3`
  color: ${constants.almostBlack};
  opacity: 0.75;
  font-size: 0.75em;
  font-weight: ${constants.fontWeightBold};
  font-family: ${constants.fontFamily};
  margin-top: 0px;
  margin-bottom: 30px;
  text-transform: uppercase;
`;

export const PieHeading = styled.h2`
  text-align: center;
  color: ${constants.almostBlack};
  font-size: 1.25em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
`;

export const ChartContainer = styled.div`
  background: #f4f6f9;
  padding: 20px;
  border-radius: 3px;
  flex: 0 1 32%;
  position: relative;
  width: 0;
`;

export const MonthGraph = styled.div`
  margin-bottom: 40px;
`;

export const DesignGraph = styled.div`
  max-width: 50%;
  flex: 1;
  margin-right: 20px;
`;

export const ProductGraph = styled.div`
  flex: 1;
  max-width: 50%;
  margin-left: 20px;
`;

export const DashboardIconSmall = styled.img`
  height: 40px;
  margin-right: 20px;
`;

export const SectionIcon = styled.img`
  height: 24px;
  margin-right: 10px;
`;

export const SubHeading = styled.h2`
  color: ${constants.almostBlack};
  font-size: 1.25em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin-bottom: 20px;
  margin-top: 0;
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
  margin-bottom: 40px;
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

export const SearchContainer = styled.div`
  display: block;
  position: relative;
`;

export const SearchResults = styled.div`
  position: absolute;
  min-width: 200px;
  top: 75px;
  border-radius: 2px;
  box-shadow: 0 3px 15px 3px rgba(0, 0, 0, 0.2);
  color: ${constants.almostBlack};
  background: white;
  padding: 5px 15px 15px 15px;
  z-index: 1000;
  font-size: ${constants.fontSizeMedium};
`;

export const ResultRow = styled.div`
  display: flex;
  border-bottom: 1px solid ${constants.almostWhite};

  &:last-child {
    border: none;
  }
`;

export const PartItem = styled.div`
  margin-top: 5px;
`;

export const PartNumber = styled.span`
  font-weight: ${constants.fontWeightMedium};
`;

export const PartDetails = styled.span`
  margin-left: 10px;
`;

export const CloseButton = styled.div`
  background: ${constants.almostWhite};
  padding: 6px;
  border-radius: 3px;
  border: none;
  outline: none;
  margin-top: 10px;
  color: ${constants.almostBlack};
  cursor: pointer;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    display: block;
  }
`;

export const FlexField = styled.div`
  flex: 1;
  margin-right: 20px;

  @media (max-width: 500px) {
    margin-right: 0;
  }
`;

export const FlexButton = styled.div`
  @media (max-width: 500px) {
    width: 100%;
  }
`;
