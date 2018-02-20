import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledMessage, MessageContainer, MessageHeading, MessageIcon, MessageText, CloseMessageBtn } from './Styled';
import warningIcon from './images/alert-circle.svg';
import successIcon from './images/check-circle.svg';

class AlertMessage extends Component {
  state = {
    showMessage: true,
  };

  toggleMessage = () => {
    this.props.toggleMessage(false);
  };

  render() {
    const { type, text, closable, margin } = this.props;
    return (
      <StyledMessage type={type} margin={margin}>
        <MessageContainer>
          <MessageHeading>
            {type === 'success' ? (
              <MessageIcon src={successIcon} alt="Warning" />
            ) : (
              <MessageIcon src={warningIcon} alt="Warning" />
            )}
            <MessageText>{text}</MessageText>
          </MessageHeading>
          {closable && (
            <CloseMessageBtn type={type} onClick={this.toggleMessage}>
              Close
            </CloseMessageBtn>
          )}
        </MessageContainer>
      </StyledMessage>
    );
  }
}

const { func, string, bool } = PropTypes;
AlertMessage.propTypes = {
  toggleMessage: func.isRequired,
  type: string.isRequired,
  text: string.isRequired,
  closable: bool.isRequired,
  margin: bool.isRequired,
};

AlertMessage.defaultProps = {
  closable: false,
  margin: false,
};

export default AlertMessage;
