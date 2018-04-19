import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Container, Checkmark, CheckmarkCircle, CheckmarkCheck } from './Styled';

const Success = ({ headline, message, redirect }) => (
  <Container>
    <Checkmark xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <CheckmarkCircle cx="26" cy="26" r="25" fill="none" />
      <CheckmarkCheck fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </Checkmark>

    <Typography align="center" variant="title">
      {headline}
    </Typography>
    <Typography align="center" variant="subheading">
      {message}
    </Typography>
    {redirect && (
      <Button style={{ marginRight: '10px', marginTop: '40px' }} color="primary" component={Link} to={redirect.to}>
        {redirect.text}
      </Button>
    )}
  </Container>
);

const { string, shape } = PropTypes;
Success.propTypes = {
  headline: string.isRequired,
  message: string.isRequired,
  redirect: shape({}),
};

Success.defaultProps = {
  redirect: null,
};

export default Success;
