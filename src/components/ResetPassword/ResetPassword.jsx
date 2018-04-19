import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResetPasswordForm from '../ResetPasswordForm';
import { resetPassword } from '../../actions/auth';
import { Wrapper } from './Styled';

class ResetPassword extends Component {
  submit = data => this.props.resetPassword(data).then(() => this.props.history.push('/'));

  render() {
    return (
      <Wrapper>
        <ResetPasswordForm submit={this.submit} />
      </Wrapper>
    );
  }
}

const { shape, func } = PropTypes;
ResetPassword.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
  resetPassword: func.isRequired,
};

export default connect(null, { resetPassword })(ResetPassword);
