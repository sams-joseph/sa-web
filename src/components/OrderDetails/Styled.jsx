import styled from 'styled-components';
import constants from '../constants';

export const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  margin-bottom: 70px;
  min-height: calc(100vh - 435px);
`;

export const PartItems = styled.div`
  flex: 1;
`;

export const HeadingIcon = styled.img`
  margin-top: 5px;
  height: 40px;
  margin-right: 20px;
`;

export const Flex = styled.div`
  margin-top: 70px;
  margin-bottom: 50px;
  display: flex;
`;

export const Heading = styled.h1`
  color: ${constants.almostBlack};
  font-size: 1.75em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin: 0;
  padding: 0;
`;

export const SubHeading = styled.h3`
  color: ${constants.almostBlack};
  opacity: 0.75;
  font-size: 0.75em;
  font-weight: ${constants.fontWeightBold};
  font-family: ${constants.fontFamily};
  text-transform: uppercase;
  margin: 0;
  padding: 0;
`;

export const ShippingList = styled.ul`
  display: block;
  list-style-type: none;
  padding: 0;
  margin: 0 0 50px 70px;
`;

export const SectionHeading = styled.h2`
  color: ${constants.almostBlack};
  font-size: 1.25em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin-bottom: 30px;
  margin-top: 0;
`;

export const ShippingHeading = styled.li`
  color: ${constants.almostBlack};
  font-size: 1.25em;
  font-weight: ${constants.fontWeightLight};
  font-family: ${constants.fontFamily};
  margin-bottom: 20px;
  margin-top: 0;
`;

export const ShippingListItem = styled.li`
  color: ${constants.almostBlack};
  font-size: 1em;
  line-height: 26px;
  font-weight: ${constants.fontWeightNormal};
  font-family: ${constants.fontFamily};
`;

export const SectionIcon = styled.img`
  height: 20px;
  margin-right: 10px;
`;
