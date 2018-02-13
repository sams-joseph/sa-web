import React from 'react';
import PropTypes from 'prop-types';
import { StyledSpan } from './Styled';

const InlineError = ({ text }) => <StyledSpan>{text}</StyledSpan>;

const { string } = PropTypes;
InlineError.propTypes = {
  text: string,
};

InlineError.defaultProps = {
  text: '',
};

export default InlineError;
