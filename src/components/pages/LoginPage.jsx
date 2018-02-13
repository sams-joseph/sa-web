import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';
import { StyledContainer } from './Styled';

class LoginPage extends Component {
  submit = data => {
    console.log(data);
  };

  render() {
    return (
      <StyledContainer>
        <LoginForm submit={this.submit} />
      </StyledContainer>
    );
  }
}

export default LoginPage;
