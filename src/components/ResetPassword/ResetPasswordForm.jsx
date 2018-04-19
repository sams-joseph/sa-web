import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Alert from '../Alert';
import { Form, Heading } from './Styled';

class ResetPasswordForm extends Component {
  state = {
    data: {
      password: '',
      confirm: '',
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
      this.props.submit(this.state.data.password).catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
    }
  };

  validate = data => {
    const errors = {};
    if (!data.password) errors.password = 'Cannot be blank';
    if (!data.confirm) errors.confirm = 'Cannot be blank';
    if (data.password !== data.confirm) errors.password = 'Passwords do not match';
    if (data.password !== data.confirm) errors.confirm = 'Passwords do not match';

    return errors;
  };

  render() {
    const { data, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Heading as="h2" textAlign="center">
          Reset Password
        </Heading>
        <div>
          {errors.global && <Alert margin type="danger" text={errors.global} />}
          <FormControl fullWidth margin="normal">
            <TextField
              label={errors.password ? errors.password : 'New Password'}
              type="password"
              name="password"
              value={data.password}
              onChange={this.onChange('password')}
              error={!!errors.password}
            />
            <TextField
              style={{ marginTop: '20px' }}
              label={errors.confirm ? errors.confirm : 'Confirm Password'}
              type="password"
              name="confirm"
              value={data.confirm}
              onChange={this.onChange('confirm')}
              error={!!errors.confirm}
            />
          </FormControl>
          <Button style={{ marginTop: '20px' }} variant="raised" color="primary" type="submit" fullWidth>
            Reset Password
          </Button>
        </div>
      </Form>
    );
  }
}

const { func } = PropTypes;
ResetPasswordForm.propTypes = {
  submit: func.isRequired,
};

export default ResetPasswordForm;
