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
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s, border 0.25s;
  cursor: pointer;
  border: ${props => (props.checked ? `1px solid #00bbff` : `1px solid transparent`)};
  box-shadow: ${props => (props.checked ? `0 0px 16px #00bbff` : 'none')};

  &:nth-child(2) {
    margin: 0 0 0 10px;
  }

  &:hover {
    box-shadow: ${props => (props.checked ? `0 0 16px #00bbff` : '0 0 12px rgba(0, 0, 0, 0.5)')};
  }
`;

export const ProductMeta = styled.footer`
  background: linear-gradient(to top, rgba(0, 103, 249, 0.75) 50%, rgba(0, 103, 249, 0.05));
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ProductHeading = styled.h1`
  font-weight: ${constants.fontWeightLight};
  margin: 0;
  color: white;
`;

export const ProductDescription = styled.p`
  color: white;
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
