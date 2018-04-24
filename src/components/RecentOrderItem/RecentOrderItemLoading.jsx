import React from 'react';
import {
  ThumbnailLoading,
  Container,
  ItemDetails,
  Header,
  HeaderLoading,
  Body,
  Details,
  DetailsLoading,
} from './Styled';

const RecentOrderItemLoading = () => (
  <Container>
    <ThumbnailLoading />
    <ItemDetails>
      <Header>
        <HeaderLoading />
        <HeaderLoading />
      </Header>
      <Body>
        <Details>
          <div>
            <DetailsLoading />
            <DetailsLoading />
          </div>
          <div>
            <DetailsLoading />
            <DetailsLoading />
          </div>
          <div>
            <DetailsLoading />
            <DetailsLoading />
          </div>
        </Details>
      </Body>
    </ItemDetails>
  </Container>
);

export default RecentOrderItemLoading;
