import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCsrInformation } from '../../actions/csr';
import { logout } from '../../actions/auth';
import { Wrapper, Container, Heading, AccountIconSmall } from './Styled';
import SecurityIcon from './images/security-icon.svg';

class Admin extends Component {
  render() {
    return (
      <Wrapper>
        <Container padding="30px 0">
          <Heading>
            <AccountIconSmall src={SecurityIcon} />Admin
          </Heading>
        </Container>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    csr: state.csr,
    user: state.user,
  };
}

export default connect(mapStateToProps, { getCsrInformation, logout })(Admin);
