import React, { Component } from 'react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import { Header, Message, Segment, Grid, Form, Button } from 'semantic-ui-react';
import { StyledLink } from './Styled';

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
    const { data, errors, loading } = this.state;
    return (
      <div className="login-form">
        <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large" onSubmit={this.onSubmit} loading={loading}>
              <Header as="h2" color="blue" textAlign="center">
                Welcome Back
              </Header>
              <Segment stacked>
                {errors.global && (
                  <Message negative>
                    <p>{errors.global}</p>
                  </Message>
                )}
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  value={data.email}
                  onChange={this.onChange}
                  error={!!errors.email}
                />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  name="password"
                  placeholder="password"
                  value={data.password}
                  onChange={this.onChange}
                  error={!!errors.password}
                />
                <Button fluid color="blue">
                  Login
                </Button>
                <StyledLink to="/reset-password">Forgot password?</StyledLink>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const { func } = PropTypes;
LoginForm.propTypes = {
  submit: func.isRequired,
};

export default LoginForm;
