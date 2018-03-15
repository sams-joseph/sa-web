import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 70px auto;
`;

export const MetaContainer = styled.div`
  display: flex;
`;

export const DesignContainer = styled.div`
  display: block;
  flex: 1 1 75%;
  margin-bottom: 30px;
`;

export const DesignPreview = styled.img`
  width: 100%;
  height: auto;
`;

export const Flex = styled.div`
  margin-left: 50px;
  flex: 0 0 400px;
  display: flex;
`;

export const FlexLeft = styled.div`
  flex: 0 1 50%;
  padding-right: 35px;
`;

export const FlexRight = styled.div`
  flex: 0 1 50%;
  padding-left: 35px;
`;

export const ShippingForm = styled.form`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
`;
