import React from 'react';
import { Message } from 'semantic-ui-react';

function ConfirmEmailMessage() {
  return (
    <Message info>
      <Message.Header>Your email has not been verified</Message.Header>
    </Message>
  );
}

export default ConfirmEmailMessage;
