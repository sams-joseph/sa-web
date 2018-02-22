import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import AlertMessage from '../messages/AlertMessage';
import { getSizeByProduct } from '../../actions/size';
import { Container, Heading, Hero } from './Styled';
import constants from '../constants';

class DesignsPage extends Component {
  state = {
    showMessage: true,
  };

  componentDidMount() {
    this.props.getSizeByProduct(this.props.productID).then(sizes => console.log(sizes));
  }

  toggleMessage = showMessage => {
    this.setState({
      showMessage,
    });
  };

  render() {
    const { isConfirmed, sizes } = this.props;
    const { showMessage } = this.state;

    const options = sizes.map(size => ({ value: size.height, label: `${size.height} x ${size.width}` }));

    return (
      <div>
        {!isConfirmed &&
          showMessage && (
            <AlertMessage
              closable
              type="info"
              text="Your email has not been verified"
              toggleMessage={this.toggleMessage}
            />
          )}
        <Hero img="https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8b7966ac7d2736e7be92801b4d2f43ed&auto=format&fit=crop&w=2550&q=80" />
        <Container>
          <Heading>Designs</Heading>
          <Select
            style={{
              borderColor: constants.almostWhite,
              borderRadius: '2px',
            }}
            name="form-field-name"
            options={options}
          />
        </Container>
      </div>
    );
  }
}

const { bool, func, number } = PropTypes;
DesignsPage.propTypes = {
  isConfirmed: bool.isRequired,
  getSizeByProduct: func.isRequired,
  productID: number.isRequired,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    productID: state.order.productID,
    sizes: state.size,
  };
}

export default connect(mapStateToProps, { getSizeByProduct })(DesignsPage);
