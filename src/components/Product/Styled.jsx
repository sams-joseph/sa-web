import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
  width: 100%;
  padding: 20px;
`;

export const ProductHeading = styled.h1`
  font-weight: ${constants.fontWeightLight};
  margin: 0;
  color: white;
`;

export const ProductDescription = styled.p`
  color: white;
  margin-bottom: 40px;
  max-width: 300px;
  font-size: ${constants.fontSizeMedium};
  line-height: ${constants.lineHeight};
`;

export const ProductButton = styled(Link)`
  display: block;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  color: white;
  background: ${constants.defaultPrimaryColor};
  font-weight: ${constants.fontWeightLight};
  padding: 10px 0;
  width: 150px;
  transition: background 0.125s, box-shadow 0.125s, transform 0.125s;
  text-decoration: none;
  text-align: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.8);

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${constants.defaultPrimaryColorMuted};
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0);
    transform: translateY(1px);
  }
`;
