import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Validator from 'validator';
import PropTypes from 'prop-types';
import { Header, Message, Segment, Grid, Form, Button } from 'semantic-ui-react';

class ResetPasswordForm extends Component {
  state = {
    data: {
      email: '',
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

    return errors;
  };

  render() {
    const { data, errors } = this.state;
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
            <Form size="large" onSubmit={this.onSubmit}>
              <Header as="h2" color="blue" textAlign="center">
                Enter your email address
              </Header>
              <Segment stacked>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  value={data.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <Button fluid color="blue">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              Know your password? <Link to="/login">Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const { func } = PropTypes;
ResetPasswordForm.propTypes = {
  submit: func.isRequired,
};

export default ResetPasswordForm;
