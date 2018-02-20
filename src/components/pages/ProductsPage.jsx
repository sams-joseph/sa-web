import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AlertMessage from '../messages/AlertMessage';
import { Container, Heading } from './Styled';

class ProductsPage extends Component {
  state = {
    showMessage: true,
  };
  toggleMessage = showMessage => {
    this.setState({
      showMessage,
    });
  };

  render() {
    const { isConfirmed } = this.props;
    const { showMessage } = this.state;
    return (
      <div>
        {!isConfirmed &&
          showMessage && (
            <AlertMessage
              closable
              type="info"
              text="Your email has not been verified"
              toggleMessage={this.toggleMessage}
            />
          )}
        <Container>
          <Heading>Products</Heading>
        </Container>
      </div>
    );
  }
}

const { bool } = PropTypes;
ProductsPage.propTypes = {
  isConfirmed: bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
  };
}

export default connect(mapStateToProps)(ProductsPage);
