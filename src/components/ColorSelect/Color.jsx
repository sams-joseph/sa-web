import React from 'react';
import PropTypes from 'prop-types';
import { ColorBox } from './Styled';

const Color = ({ hex }) => <ColorBox hex={hex} />;

const { string } = PropTypes;
Color.propTypes = {
  hex: string.isRequired,
};

export default Color;
