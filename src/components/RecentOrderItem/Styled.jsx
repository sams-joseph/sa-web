import styled from 'styled-components';
import constants from '../constants';

export const Container = styled.div`
  margin-bottom: 20px;
  max-width: 900px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${constants.almostWhite};

  @media (max-width: 900px) {
    display: flex;
  }

  @media (max-width: 800px) {
    display: block;
  }
`;

export const ThumbnailContainer = styled.div`
  display: block;

  @media (max-width: 900px) {
    max-width: 400px;
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
`;

export const ThumbnailLoading = styled.div`
  max-width: 400px;
  width: 100%;
  background: ${constants.almostWhite};
  height: 150px;
  animation: flash linear 2s infinite;
  border-radius: 1px;

  @keyframes flash {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const ItemDetails = styled.div`
  flex: 1;
  margin-top: 10px;

  @media (max-width: 900px) {
    margin-left: 40px;
  }

  @media (max-width: 800px) {
    margin-left: 0;
    max-width: 400px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const HeaderLoading = styled.header`
  height: 20px;
  width: 100px;
  background: ${constants.almostWhite};
  margin-bottom: 10px;
  animation: flash linear 2s infinite;
  border-radius: 1px;

  @keyframes flash {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
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

export const DetailsLoading = styled.div`
  margin: 0 20px 4px 0;
  height: 16px;
  width: 60px;
  background: ${constants.almostWhite};
  animation: flash linear 2s infinite;
  border-radius: 1px;

  @keyframes flash {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;
