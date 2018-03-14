import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { Container } from './Styled';

import { getProductByID } from '../../actions/product';
import { getDesignByID } from '../../actions/design';

class Summary extends Component {
  componentDidMount() {
    if (Object.getOwnPropertyNames(this.props.order).length > 0) {
      this.props.getProductByID(this.props.order.product.productID);
      this.props.getDesignByID(this.props.order.design.designID);
    } else {
      this.props.history.push('/design');
    }
  }

  render() {
    const { product, design } = this.props;

    return (
      <Container>
        <Paper style={{ background: '#414160', margin: '70px 20px', padding: '20px' }}>
          <Typography variant="headline" component="h3">
            Order Summary
          </Typography>
          <Divider />
          <Typography>{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography>{design.name}</Typography>
          <Typography>{design.description}</Typography>
        </Paper>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    order: state.order,
    product: state.product,
    design: state.design,
  };
}

const { shape, func } = PropTypes;
Summary.propTypes = {
  order: shape({}).isRequired,
  getProductByID: func.isRequired,
  getDesignByID: func.isRequired,
  product: shape({}).isRequired,
  design: shape({}).isRequired,
  history: shape({ push: func.isRequired }).isRequired,
};

export default connect(mapStateToProps, { getProductByID, getDesignByID })(Summary);
