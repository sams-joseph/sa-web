import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends Component {
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

        {!loading &&
          success && (
            <Message success icon>
              <Icon name="checkmark" />
              <Message.Content>
                <Message.Header>Your email has been verified successfuly</Message.Header>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Message.Content>
            </Message>
          )}

        {!loading &&
          !success && (
            <Message negative icon>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>This link has either already been used or is not valid</Message.Header>
              </Message.Content>
            </Message>
          )}
      </div>
    );
  }
}

const { func, shape, string } = PropTypes;
ConfirmationPage.propTypes = {
  confirm: func.isRequired,
  match: shape({
    params: shape({
      token: string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(null, { confirm })(ConfirmationPage);
