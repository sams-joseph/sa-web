import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const { shape, node } = PropTypes;
ScrollToTop.propTypes = {
  children: shape({ node }).isRequired,
  location: shape({}).isRequired,
};

export default withRouter(ScrollToTop);
