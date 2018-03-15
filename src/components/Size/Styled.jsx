import styled from 'styled-components';
import { Link } from 'react-router-dom';
import constants from '../constants';

export const SizeContainer = styled.div`
  background: #f5f5f5;
  background-size: cover;
  background-position: center;
  display: flex;
  width: 50%;
  height: 100px;
  margin: 0 10px 0 0;
  border-radius: 2px;
  overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s;
  cursor: pointer;

  &:nth-child(2) {
    margin: 0 0 0 10px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.5);
  }
`;

export const SizeMeta = styled.footer`
  align-items: center;
  display: flex;
  width: 100%;
  padding: 20px;
`;

export const SizeHeading = styled.h1`
  font-weight: ${constants.fontWeightLight};
  margin: 0;
  color: ${constants.almostBlack};
`;

export const SizeDescription = styled.p`
  color: white;
  margin-bottom: 40px;
  max-width: 300px;
  font-size: ${constants.fontSizeMedium};
  line-height: ${constants.lineHeight};
`;

export const SizeButton = styled(Link)`
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
