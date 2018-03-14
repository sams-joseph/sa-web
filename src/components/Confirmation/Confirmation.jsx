import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirm } from '../../actions/auth';
import Alert from '../Alert';

class Confirmation extends Component {
  state = {
    loading: true,
    success: false,
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;
    return (
      <div>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating email address</Message.Header>
          </Message>
        )}

        {!loading && success && <Alert type="success" text="Your email has been verified successfuly" />}

        {!loading && !success && <Alert type="danger" text="This link has either already been used or is not valid" />}
      </div>
    );
  }
}

const { func, shape, string } = PropTypes;
Confirmation.propTypes = {
  confirm: func.isRequired,
  match: shape({
    params: shape({
      token: string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(null, { confirm })(Confirmation);
