import React, { Component } from 'react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Alert from '../Alert';
import { StyledLink, Form, Heading } from './Styled';

class LoginForm extends Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
  };

  onChange = name => e =>
    this.setState({
      data: { ...this.state.data, [name]: e.target.value },
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
        <Heading as="h2" textAlign="center">
          Welcome Back
        </Heading>
        <div>
          {errors.global && <Alert margin type="danger" text={errors.global} />}
          <FormControl fullWidth margin="normal">
            <TextField
              label={errors.email ? errors.email : 'Email'}
              type="email"
              name="email"
              placeholder="example@example.com"
              value={data.email}
              onChange={this.onChange('email')}
              error={!!errors.email}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label={errors.password ? errors.password : 'Password'}
              type="password"
              name="password"
              placeholder="**********"
              value={data.password}
              onChange={this.onChange('password')}
              error={!!errors.password}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <Button style={{ marginTop: '20px' }} variant="raised" color="primary" type="submit" fullWidth>
            Login
          </Button>
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
