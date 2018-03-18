import styled from 'styled-components';
import constants from '../constants';

export const Container = styled.div`
  margin-bottom: 20px;
  max-width: 900px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${constants.almostWhite};
`;

export const ThumbnailContainer = styled.div`
  display: block;
`;

export const Thumbnail = styled.img`
  width: 100%;
`;

export const ItemDetails = styled.div`
  flex: 1;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Body = styled.div`
  display: flex;
  justify-content: space-between;
  height: 48px;
`;

export const Details = styled.div`
  display: flex;
  align-items: center;
`;

export const Actions = styled.div``;

export const Quantity = styled.div`
  display: flex;
`;

export const Increments = styled.div`
  width: 24px;
  height: 48px;
  cursor: pointer;
`;

export const QuantityValue = styled.span`
  border: 1px solid ${constants.almostWhite};
  border-radiue: 2px;
  display: block;
  width: 48px;
  height: 24px;
  text-align: center;
  line-height: 24px;
`;
