import React, { Component } from 'react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../../messages/InlineError';
import { StyledForm, StyledHeading, StyledInput, StyledButton, StyledLink } from './Styled';

class LoginForm extends Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: '' },
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid Email';
    if (!data.password) errors.password = 'Cannot be blank';

    return errors;
  };

  render() {
    const { data, errors } = this.state;
    return (
      <StyledForm onSubmit={this.onSubmit}>
        <StyledHeading>Welcome</StyledHeading>
        {errors.email && <InlineError text={errors.email} />}
        <StyledInput
          type="email"
          name="email"
          placeholder="example@example.com"
          value={data.email}
          onChange={this.onChange}
          error={errors.email}
        />
        {errors.password && <InlineError text={errors.password} />}
        <StyledInput
          type="password"
          name="password"
          placeholder="password"
          value={data.password}
          onChange={this.onChange}
          error={errors.password}
        />
        <StyledButton>Login</StyledButton>
        <StyledLink to="/ResetPassword">Forgot password?</StyledLink>
      </StyledForm>
    );
  }
}

const { func } = PropTypes;
LoginForm.propTypes = {
  submit: func.isRequired,
};

export default LoginForm;
