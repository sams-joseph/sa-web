import React from 'react';
import Typography from 'material-ui/Typography';
import { Container, Checkmark, CheckmarkCircle, CheckmarkCheck } from './Styled';

const Completion = () => (
  <Container>
    <Checkmark xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <CheckmarkCircle cx="26" cy="26" r="25" fill="none" />
      <CheckmarkCheck fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </Checkmark>

    <Typography variant="title">Success!</Typography>
    <Typography variant="subheading">Your order has been placed successfully.</Typography>
  </Container>
);

export default Completion;
