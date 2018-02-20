import React, { Component } from 'react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../../messages/InlineError';
import AlertMessage from '../../messages/AlertMessage';
import { StyledLink, Form, Heading, Input, Button } from './Styled';

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
      this.props.submit(this.state.data).catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
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
      <Form onSubmit={this.onSubmit}>
        <Heading as="h2" color="blue" textAlign="center">
          Welcome Back
        </Heading>
        <div>
          {errors.global && <AlertMessage margin type="danger" text={errors.global} />}
          {!!errors.email && <InlineError text={errors.email} />}
          <Input
            type="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
            error={!!errors.email}
          />
          {!!errors.password && <InlineError text={errors.password} />}
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={data.password}
            onChange={this.onChange}
            error={!!errors.password}
          />
          <Button>Login</Button>
          <StyledLink to="/reset-password">Forgot password?</StyledLink>
        </div>
      </Form>
    );
  }
}

const { func } = PropTypes;
LoginForm.propTypes = {
  submit: func.isRequired,
};

export default LoginForm;
