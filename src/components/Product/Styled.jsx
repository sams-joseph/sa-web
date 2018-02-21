import styled from 'styled-components';
import constants from '../constants';

export const ProductContainer = styled.div`
  background: url(${props => props.img}) no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  width: 50%;
  height: 300px;
  margin: 0 10px 0 0;
  border-radius: 2px;
  overflow: hidden;

  &:nth-child(2) {
    margin: 0 0 0 10px;
  }
`;

export const ProductMeta = styled.footer`
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1));
  width: 100%;
  padding: 20px;
`;

export const ProductHeading = styled.h2`
  margin: 0;
  color: white;
`;

export const ProductDescription = styled.p`
  color: white;
  margin-bottom: 40px;
`;

export const ProductButton = styled.button`
  display: block;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  color: white;
  background: ${constants.defaultPrimaryColor};
  padding: 10px 0;
  width: 100%;
  transition: background 0.125s;

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${constants.darkPrimaryColor};
  }
`;
